import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useStore } from '@/store/useStore';
import { 
  hashPassword, 
  verifyPassword, 
  validatePassword, 
  validateEmail,
  sanitizeInput,
  rateLimiter,
  isSessionExpired,
  getSessionExpiryTime
} from '@/lib/security';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export const useAdminAuth = () => {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsAdmin } = useStore();

  useEffect(() => {
    checkAdminSession();
  }, []);

  const checkAdminSession = async () => {
    try {
      const sessionToken = localStorage.getItem('adminSessionToken');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      if (!sessionToken || !loginTime) {
        setIsLoading(false);
        return;
      }

      // Check if session has expired
      if (isSessionExpired(parseInt(loginTime))) {
        localStorage.removeItem('adminSessionToken');
        localStorage.removeItem('adminLoginTime');
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      const { data: session, error } = await supabase
        .from('admin_sessions')
        .select(`
          admin_id,
          expires_at,
          admin_users (
            id,
            name,
            email,
            created_at
          )
        `)
        .eq('session_token', sessionToken)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !session?.admin_users) {
        localStorage.removeItem('adminSessionToken');
        localStorage.removeItem('adminLoginTime');
        setIsAdmin(false);
      } else {
        setCurrentAdmin(session.admin_users as AdminUser);
        setIsAdmin(true);
        
        // Update last accessed time
        await supabase
          .from('admin_sessions')
          .update({ last_accessed: new Date().toISOString() })
          .eq('session_token', sessionToken);
      }
    } catch (error) {
      console.error('Error checking admin session:', error);
      localStorage.removeItem('adminSessionToken');
      localStorage.removeItem('adminLoginTime');
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (email: string, password: string) => {
    try {
      // Input validation
      if (!validateEmail(email)) {
        return { success: false, error: 'Invalid email format' };
      }

      const sanitizedEmail = sanitizeInput(email);

      // Rate limiting
      const loginKey = `login_${sanitizedEmail}`;
      if (!rateLimiter.isAllowed(loginKey, 5, 900000)) { // 5 attempts per 15 minutes
        return { 
          success: false, 
          error: 'Too many login attempts. Try again in 15 minutes.' 
        };
      }

      // Query admin user
      const { data: admin, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', sanitizedEmail)
        .single();

      if (error || !admin) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Verify password
      const isValidPassword = await verifyPassword(password, admin.password_hash);
      if (!isValidPassword) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Create session
      const sessionToken = crypto.randomUUID();
      const loginTime = Date.now();
      const expiresAt = new Date();
      expiresAt.setTime(getSessionExpiryTime(loginTime));

      const { error: sessionError } = await supabase
        .from('admin_sessions')
        .insert({
          admin_id: admin.id,
          session_token: sessionToken,
          expires_at: expiresAt.toISOString(),
          created_at: new Date().toISOString(),
          last_accessed: new Date().toISOString()
        });

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        return { success: false, error: 'Failed to create session' };
      }

      // Store session data
      localStorage.setItem('adminSessionToken', sessionToken);
      localStorage.setItem('adminLoginTime', loginTime.toString());
      
      setCurrentAdmin(admin);
      setIsAdmin(true);

      // Log the login activity
      await logActivity('login', 'admin_user', admin.id, { email: sanitizedEmail });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logoutAdmin = async () => {
    try {
      const sessionToken = localStorage.getItem('adminSessionToken');
      if (sessionToken && currentAdmin) {
        await logActivity('logout', 'admin_user', currentAdmin.id);
        
        // Delete session from database
        await supabase
          .from('admin_sessions')
          .delete()
          .eq('session_token', sessionToken);
      }
      
      localStorage.removeItem('adminSessionToken');
      localStorage.removeItem('adminLoginTime');
      setCurrentAdmin(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if database cleanup fails
      localStorage.removeItem('adminSessionToken');
      localStorage.removeItem('adminLoginTime');
      setCurrentAdmin(null);
      setIsAdmin(false);
    }
  };

  const createAdminUser = async (name: string, email: string, password: string) => {
    try {
      // Input validation
      if (!validateEmail(email)) {
        return { success: false, error: 'Invalid email format' };
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.errors.join(', ') };
      }

      // Sanitize inputs
      const sanitizedName = sanitizeInput(name);
      const sanitizedEmail = sanitizeInput(email);

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create admin user
      const { data, error } = await supabase
        .from('admin_users')
        .insert({
          name: sanitizedName,
          email: sanitizedEmail,
          password_hash: hashedPassword,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          return { success: false, error: 'Email already exists' };
        }
        return { success: false, error: 'Failed to create admin user' };
      }

      // Log the creation activity
      await logActivity('create', 'admin_user', data.id, { 
        name: sanitizedName, 
        email: sanitizedEmail 
      });

      return { success: true, data };
    } catch (error) {
      console.error('Create admin error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logActivity = async (
    action: string, 
    targetType: string, 
    targetId?: string, 
    details?: any
  ) => {
    try {
      if (!currentAdmin) return;

      await supabase
        .from('admin_activity_logs')
        .insert({
          admin_id: currentAdmin.id,
          action,
          target_type: targetType,
          target_id: targetId,
          details: details || {},
          ip_address: 'N/A', // Could be enhanced with real IP detection
          user_agent: navigator.userAgent,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return {
    currentAdmin,
    isLoading,
    loginAdmin,
    logoutAdmin,
    createAdminUser,
    logActivity
  };
};
