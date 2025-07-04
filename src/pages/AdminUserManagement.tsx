import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/use-toast';
import { Users, Plus, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/Layout/AdminLayout';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

const AdminUserManagement = () => {
  const { currentAdmin, createAdminUser, logActivity } = useAdminAuth();
  const { toast } = useToast();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    loadAdminUsers();

    const channel = supabase
      .channel('custom-admin-user-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'admin_users' },
        (payload) => {
          setAdminUsers((prevUsers) => [...prevUsers, payload.new as AdminUser]);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'admin_users' },
        (payload) => {
          setAdminUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== (payload.old as AdminUser).id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdminUsers(data || []);
    } catch (error) {
      console.error('Error loading admin users:', error);
      toast({
        title: "Error",
        description: "Failed to load admin users",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!newAdmin.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(newAdmin.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    const passwordValidation = validatePassword(newAdmin.password);
    if (!passwordValidation.isValid) {
      toast({
        title: "Password Requirements",
        description: passwordValidation.errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    try {
      const result = await createAdminUser(
        newAdmin.name.trim(),
        newAdmin.email.trim(),
        newAdmin.password
      );

      if (result.success) {
        toast({
          title: "Success",
          description: "Admin user created successfully"
        });

        setNewAdmin({ name: '', email: '', password: '' });
        setIsDialogOpen(false);
        loadAdminUsers();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create admin user",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAdmin = async (adminId: string, adminName: string) => {
    if (adminId === currentAdmin?.id) {
      toast({
        title: "Error",
        description: "You cannot delete your own account",
        variant: "destructive"
      });
      return;
    }

    if (!confirm(`Are you sure you want to delete admin "${adminName}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', adminId);

      if (error) throw error;

      await logActivity('delete', 'admin_user', adminId, { name: adminName });

      toast({
        title: "Success",
        description: "Admin user deleted successfully"
      });

      loadAdminUsers();
    } catch (error) {
      console.error('Error deleting admin user:', error);
      toast({
        title: "Error",
        description: "Failed to delete admin user",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout pageTitle="User Management">
        <div className="flex items-center justify-center p-8">Loading users...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="Admin User Management">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Users</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Admin
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Admin Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminUsers.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{admin.name}</p>
                  <p className="text-sm text-muted-foreground">{admin.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Created: {new Date(admin.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {admin.id === currentAdmin?.id && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Current User
                    </span>
                  )}
                  {admin.id !== currentAdmin?.id && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAdmin(admin.id, admin.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Admin User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Admin</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUserManagement;
function validateEmail(email: string) {
  // Simple email regex for basic validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password: string) {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push("at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("an uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("a lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("a number");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("a special character");
  }
  return {
    isValid: errors.length === 0,
    errors: errors.length
      ? ["Password must contain " + errors.join(", ")]
      : [],
  };
}

