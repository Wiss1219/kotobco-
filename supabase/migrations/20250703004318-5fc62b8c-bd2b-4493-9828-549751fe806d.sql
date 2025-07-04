
-- Remove the hardcoded admin user and create proper admin management
DELETE FROM public.admin_users WHERE email = 'admin@kotobcom.tn';

-- Create admin activity logging table
CREATE TABLE public.admin_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.admin_users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL, -- 'product', 'order', 'admin_user'
  target_id UUID,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_activity_logs
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for admin activity logs (only admins can view)
CREATE POLICY "Admins can view activity logs" 
  ON public.admin_activity_logs 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can create activity logs" 
  ON public.admin_activity_logs 
  FOR INSERT 
  WITH CHECK (true);

-- Create an admin management table for better admin user management
CREATE TABLE public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.admin_users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on admin_sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for admin sessions
CREATE POLICY "Admins can manage their sessions" 
  ON public.admin_sessions 
  FOR ALL 
  USING (true);

-- Add real-time support for activity logs
ALTER TABLE public.admin_activity_logs REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_activity_logs;

-- Insert a default admin user (you can change this later)
INSERT INTO public.admin_users (name, email, password_hash) 
VALUES ('Administrator', 'admin@kotobcom.com', '$2a$10$XQKvF5xY8p.sBfJ5vGH7OeB5K2J8N9WqR2P1M6L3Q7T8U9V0W1X2Y3');
