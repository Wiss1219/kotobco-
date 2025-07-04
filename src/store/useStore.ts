
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, Order, Language } from '@/types';
import { supabase } from '@/integrations/supabase/client';

interface Store {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  
  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
  loadProducts: () => Promise<void>;
  
  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  createOrder: (customerInfo: any, items: CartItem[]) => Promise<string>;
  
  // Admin
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Language
      language: 'ar',
      setLanguage: (lang) => set({ language: lang }),
      
      // Cart
      cart: [],
      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] });
        }
      },
      
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.product.id !== productId)
        });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cart: get().cart.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      clearCart: () => set({ cart: [] }),
      
      getCartTotal: () => {
        return get().cart.reduce((total, item) => 
          total + (item.product.price * item.quantity), 0
        );
      },
      
      // Products
      products: [],
      setProducts: (products) => set({ products }),
      
      loadProducts: async () => {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;

          const products: Product[] = data?.map(item => ({
            id: item.id,
            title: item.title,
            titleAr: item.title_ar,
            titleFr: item.title_fr,
            description: item.description || '',
            descriptionAr: item.description_ar || '',
            descriptionFr: item.description_fr || '',
            price: Number(item.price),
            image: item.image_url || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
            category: item.category as 'general' | 'religious',
            author: item.author,
            authorAr: item.author_ar,
            authorFr: item.author_fr,
            inStock: item.in_stock,
            featured: item.featured
          })) || [];

          set({ products });
        } catch (error) {
          console.error('Error loading products:', error);
        }
      },
      
      // Orders
      orders: [],
      addOrder: (order) => set({ orders: [...get().orders, order] }),
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        });
      },

      createOrder: async (customerInfo, items) => {
        try {
          const orderId = `KTC-${Date.now()}`;
          const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          
          // Create order in database
          const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert({
              order_number: orderId,
              customer_name: customerInfo.name,
              customer_phone: customerInfo.phone,
              customer_address: customerInfo.address,
              customer_city: customerInfo.city,
              total_amount: Number(total),
              status: 'pending'
            })
            .select()
            .single();

          if (orderError) throw orderError;

          // Create order items
          const orderItems = items.map(item => ({
            order_id: orderData.id,
            product_id: item.product.id,
            quantity: item.quantity,
            price: Number(item.product.price)
          }));

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

          if (itemsError) throw itemsError;

          console.log('Order created successfully:', orderId);
          return orderId;
        } catch (error) {
          console.error('Error creating order:', error);
          throw error;
        }
      },
      
      // Admin
      isAdmin: false,
      setIsAdmin: (isAdmin) => set({ isAdmin }),
    }),
    {
      name: 'kotobcom-store',
    }
  )
);
