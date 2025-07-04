import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/Layout/AdminLayout';
import { Activity, User, ShoppingCart, BookOpen } from 'lucide-react';

interface ActivityLog {
  id: string;
  action: string;
  target_type: string;
  target_id: string | null;
  details: any;
  created_at: string;
  admin_users: {
    name: string;
    email: string;
  } | null;
}

const AdminActivityLogs = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivityLogs();
    const subscription = setupRealtimeSubscription();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const loadActivityLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_activity_logs')
        .select(`
          *,
          admin_users (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error loading activity logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('activity-logs')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_activity_logs'
        },
        () => {
          console.log('Activity logs changed, reloading');
          loadActivityLogs();
        }
      )
      .subscribe();

    return channel;
  };

  const getActionIcon = (targetType: string) => {
    switch (targetType) {
      case 'product': return <BookOpen className="h-4 w-4" />;
      case 'order': return <ShoppingCart className="h-4 w-4" />;
      case 'admin_user': return <User className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
      case 'insert':
      case 'login':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      case 'logout':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  if (isLoading) {
    return (
      <AdminLayout pageTitle="Activity Logs">
        <div className="flex items-center justify-center p-8">Loading activity logs...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="Activity Logs">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Admin Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No activity logs found</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getActionIcon(log.target_type)}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getActionColor(log.action)}>
                          {log.action}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {log.target_type}
                        </span>
                      </div>
                      <p className="text-sm font-medium">
                        {log.admin_users?.name || 'Unknown Admin'} 
                        <span className="text-muted-foreground">
                          ({log.admin_users?.email || 'N/A'})
                        </span>
                      </p>
                      {log.details && Object.keys(log.details).length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {JSON.stringify(log.details, null, 0)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(log.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminActivityLogs;
