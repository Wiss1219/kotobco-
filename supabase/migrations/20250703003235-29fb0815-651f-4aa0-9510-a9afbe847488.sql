
-- Enable admin operations on products table
CREATE POLICY "Admins can insert products" 
  ON public.products 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can update products" 
  ON public.products 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Admins can delete products" 
  ON public.products 
  FOR DELETE 
  USING (true);

-- Enable admin operations on orders table  
CREATE POLICY "Admins can update orders" 
  ON public.orders 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Admins can delete orders" 
  ON public.orders 
  FOR DELETE 
  USING (true);

-- Enable admin operations on order_items table
CREATE POLICY "Admins can update order items" 
  ON public.order_items 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Admins can delete order items" 
  ON public.order_items 
  FOR DELETE 
  USING (true);

-- Enable real-time updates for admin pages
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER TABLE public.order_items REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_items;
