import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Activity,
  LogOut,
  Menu,
  Home,
  BookOpen
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/activity-logs', label: 'Activity Logs', icon: Activity },
];

const AdminSidebar = ({ className }: { className?: string }) => {
  const location = useLocation();

  return (
    <aside className={cn("flex flex-col w-64 bg-background border-r", className)}>
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold flex items-center">
          <BookOpen className="mr-2"/> Kotobcom
        </h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

const AdminHeader = ({ pageTitle }: { pageTitle: string }) => {
  const { currentAdmin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-background border-b md:px-6">
       <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
             <AdminSidebar className="flex" />
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground hidden sm:block">
          Welcome, {currentAdmin?.name}
        </p>
        <ThemeToggle />
        <Button variant="outline" size="icon" onClick={() => navigate('/')}>
            <Home className="h-5 w-5" />
            <span className="sr-only">Go to Website</span>
        </Button>
        <Button variant="outline" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export const AdminLayout = ({ children, pageTitle }: { children: React.ReactNode; pageTitle: string }) => {
  const { isLoading, currentAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !currentAdmin) {
      // Redirect to login page, but preserve the intended destination
      navigate(`/admin/login?redirect=${location.pathname}${location.search}`);
    }
  }, [isLoading, currentAdmin, navigate, location.pathname, location.search]);

  if (isLoading || !currentAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar className="hidden md:flex" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader pageTitle={pageTitle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
