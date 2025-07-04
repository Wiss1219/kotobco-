-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  description TEXT,
  description_ar TEXT,
  description_fr TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('general', 'religious')),
  author TEXT,
  author_ar TEXT,
  author_fr TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample products
INSERT INTO public.products (title, title_ar, title_fr, description, description_ar, description_fr, price, image_url, category, author, author_ar, author_fr, featured) VALUES
('The Great Gatsby', 'غاتسبي العظيم', 'Gatsby le Magnifique', 'A classic American novel', 'رواية أمريكية كلاسيكية', 'Un roman américain classique', 45.00, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop', 'general', 'F. Scott Fitzgerald', 'ف. سكوت فيتزجيرالد', 'F. Scott Fitzgerald', true),
('Sahih Bukhari', 'صحيح البخاري', 'Sahih Bukhari', 'Collection of authentic hadith', 'مجموعة أحاديث صحيحة', 'Collection de hadiths authentiques', 120.00, 'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=400&h=600&fit=crop', 'religious', 'Imam Bukhari', 'الإمام البخاري', 'Imam Bukhari', true),
('Holy Quran - Deluxe Edition', 'القرآن الكريم - نسخة فاخرة', 'Saint Coran - Édition de luxe', 'Beautiful Mushaf with gold details', 'مصحف جميل بتفاصيل ذهبية', 'Beau Mushaf avec détails dorés', 85.00, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=600&fit=crop', 'religious', '', '', '', true),
('To Kill a Mockingbird', 'لقتل طائر محاكي', 'Ne tirez pas sur l''oiseau moqueur', 'A novel about racial injustice', 'رواية عن الظلم العنصري', 'Un roman sur l''injustice raciale', 38.00, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop', 'general', 'Harper Lee', 'هاربر لي', 'Harper Lee', false),
('Riyadh as-Salihin', 'رياض الصالحين', 'Riyadh as-Salihin', 'Garden of the Righteous', 'رياض الصالحين', 'Jardin des Vertueux', 65.00, 'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=400&h=600&fit=crop', 'religious', 'Imam An-Nawawi', 'الإمام النووي', 'Imam An-Nawawi', false);

-- Enable Row Level Security (not needed for this public bookstore, but good practice)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to products (no auth required)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Anyone can view orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view order items" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view admin users" ON public.admin_users FOR SELECT USING (true);
