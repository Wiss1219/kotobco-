import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/Layout/AdminLayout';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  products: {
    title: string;
    title_ar: string;
    image_url: string;
  };
}

const AdminOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();

    const ordersChannel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Orders table changed:', payload);
          loadOrders();
          
          if (payload.eventType === 'INSERT') {
            toast({ title: 'New order received!' });
          } else if (payload.eventType === 'UPDATE') {
            toast({ title: 'Order updated!' });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
    };
  }, [toast]);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: 'Error loading orders',
        description: 'Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadOrderItems = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select(`
          *,
          products (
            title,
            title_ar,
            image_url
          )
        `)
        .eq('order_id', orderId);

      if (error) throw error;
      setOrderItems(data || []);
    } catch (error) {
      console.error('Error loading order items:', error);
      toast({
        title: 'Error loading order details',
        description: 'Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    await loadOrderItems(order.id);
    setIsDialogOpen(true);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      // Update the selected order if it's the one being updated
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      
      // Don't show toast here, real-time subscription will handle it
      // Don't manually reload orders, real-time subscription will handle it
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: 'Error updating order status',
        description: 'Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <AdminLayout pageTitle="Manage Orders">
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.order_number}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{order.total_amount.toFixed(2)} TND</TableCell>
                  <TableCell>
                    <Badge variant={order.status as 'pending' | 'processing' | 'shipped' | 'delivered' | 'default' | 'secondary' | 'destructive' | 'outline' | null | undefined}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon" onClick={() => handleViewOrder(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Order #{selectedOrder.order_number}</h3>
                <p><strong>Customer:</strong> {selectedOrder.customer_name}</p>
                <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
                <p><strong>Address:</strong> {selectedOrder.customer_address}, {selectedOrder.customer_city}</p>
                <p><strong>Total:</strong> {selectedOrder.total_amount.toFixed(2)} TND</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Items</h4>
                <ul>
                  {orderItems.map(item => (
                    <li key={item.id} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center">
                        <img src={item.products.image_url || '/placeholder.svg'} alt={item.products.title} className="h-12 w-12 object-cover rounded-md mr-4"/>
                        <div>
                          <p className="font-medium">{item.products.title}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p>{item.price.toFixed(2)} TND</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap justify-end gap-2 mt-4">
                <Button 
                  variant={selectedOrder.status === 'pending' ? 'default' : 'secondary'}
                  onClick={() => updateOrderStatus(selectedOrder.id, 'pending')}
                >
                  Pending
                </Button>
                <Button 
                  variant={selectedOrder.status === 'processing' ? 'default' : 'secondary'}
                  onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                >
                  Processing
                </Button>
                <Button 
                  variant={selectedOrder.status === 'shipped' ? 'default' : 'secondary'}
                  onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                >
                  Shipped
                </Button>
                <Button 
                  variant={selectedOrder.status === 'delivered' ? 'default' : 'secondary'}
                  onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                >
                  Delivered
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
