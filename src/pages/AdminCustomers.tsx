import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Search, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/Layout/AdminLayout';

interface Customer {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  total_orders: number;
  total_spent: number;
  last_order_date: string;
}

const AdminCustomers = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter(customer => 
      customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customer_phone.includes(searchTerm) ||
      customer.customer_city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [customers, searchTerm]);

  const loadCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('customer_name, customer_phone, customer_address, customer_city, total_amount, created_at');

      if (error) throw error;

      // Group orders by customer and calculate stats
      const customerMap = new Map<string, Customer>();
      
      data?.forEach(order => {
        const key = `${order.customer_name}-${order.customer_phone}`;
        
        if (customerMap.has(key)) {
          const existing = customerMap.get(key)!;
          existing.total_orders += 1;
          existing.total_spent += Number(order.total_amount);
          
          if (new Date(order.created_at) > new Date(existing.last_order_date)) {
            existing.last_order_date = order.created_at;
          }
        } else {
          customerMap.set(key, {
            id: key,
            customer_name: order.customer_name,
            customer_phone: order.customer_phone,
            customer_address: order.customer_address,
            customer_city: order.customer_city,
            total_orders: 1,
            total_spent: Number(order.total_amount),
            last_order_date: order.created_at
          });
        }
      });

      const customersArray = Array.from(customerMap.values())
        .sort((a, b) => new Date(b.last_order_date).getTime() - new Date(a.last_order_date).getTime());
      
      setCustomers(customersArray);
    } catch (error) {
      console.error('Error loading customers:', error);
      toast({
        title: 'Error loading customers',
        description: 'Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((sum, customer) => sum + customer.total_spent, 0);
    const avgOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.total_orders, 0) || 0;
    const repeatCustomers = customers.filter(customer => customer.total_orders > 1).length;

    return { totalCustomers, totalRevenue, avgOrderValue, repeatCustomers };
  };

  const stats = getStats();

  if (loading) {
    return (
      <AdminLayout pageTitle="Customer Management">
        <div className="flex items-center justify-center p-8">Loading customers...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="Customer Management">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)} TND</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgOrderValue.toFixed(2)} TND</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Repeat Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.repeatCustomers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Customers Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.customer_name}</TableCell>
                  <TableCell>{customer.customer_phone}</TableCell>
                  <TableCell>{customer.customer_city}</TableCell>
                  <TableCell>{customer.total_orders}</TableCell>
                  <TableCell>{customer.total_spent.toFixed(2)} TND</TableCell>
                  <TableCell>
                    {new Date(customer.last_order_date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No customers found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminCustomers;
