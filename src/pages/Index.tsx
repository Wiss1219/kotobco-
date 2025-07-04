import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useTranslation } from '@/hooks/useTranslation';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { ArrowRight, BookOpen, Star, Users, Truck, Shield, Heart } from 'lucide-react';

const Index = () => {
  const { t, isRTL } = useTranslation();
  const { products, loadProducts } = useStore();
  
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  
  const featuredProducts = products.filter(p => p.featured);
  const generalBooks = products.filter(p => p.category === 'general').slice(0, 4);
  const religiousBooks = products.filter(p => p.category === 'religious').slice(0, 4);

  const stats = [
    { icon: BookOpen, value: '1000+', label: isRTL ? 'كتاب متاح' : 'Books Available' },
    { icon: Users, value: '5000+', label: isRTL ? 'عميل راضي' : 'Happy Customers' },
    { icon: Truck, value: '24h', label: isRTL ? 'توصيل سريع' : 'Fast Delivery' },
    { icon: Shield, value: '100%', label: isRTL ? 'ضمان الجودة' : 'Quality Guarantee' },
  ];

  const features = [
    {
      icon: BookOpen,
      title: isRTL ? 'مجموعة واسعة' : 'Wide Collection',
      description: isRTL ? 'آلاف الكتب في جميع المجالات' : 'Thousands of books across all fields'
    },
    {
      icon: Truck,
      title: isRTL ? 'توصيل مجاني' : 'Free Delivery',
      description: isRTL ? 'توصيل مجاني لجميع أنحاء تونس' : 'Free delivery across Tunisia'
    },
    {
      icon: Shield,
      title: isRTL ? 'ضمان الجودة' : 'Quality Guarantee',
      description: isRTL ? 'كتب أصلية بأفضل جودة' : 'Original books with best quality'
    },
    {
      icon: Heart,
      title: isRTL ? 'خدمة عملاء ممتازة' : 'Excellent Service',
      description: isRTL ? 'دعم عملاء على مدار الساعة' : '24/7 customer support'
    }
  ];
  
  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with premium gradient */}
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="absolute inset-0 pattern-bg opacity-30"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl float-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg float-animation" style={{ animationDelay: '4s' }}></div>
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Star className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">
                {isRTL ? 'المكتبة الرقمية الأولى في تونس' : '#1 Digital Bookstore in Tunisia'}
              </span>
            </div>
          </div>
          
          <h1 className="text-hero font-arabic mb-6 leading-tight">
            <span className="block">
              {isRTL ? 'مرحباً بكم في' : 'Welcome to'}
            </span>
            <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-white to-red-100">
              {isRTL ? 'كُتُبْكُمْ' : 'Kotobcom'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            {isRTL 
              ? 'اكتشف عالماً من المعرفة مع أفضل مجموعة كتب عامة ودينية في تونس. جودة عالية، أسعار مناسبة، وتوصيل سريع.'
              : 'Discover a world of knowledge with the finest collection of general and religious books in Tunisia. Premium quality, affordable prices, and fast delivery.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/general-books">
              <Button size="lg" className="btn-premium text-white px-8 py-4 text-lg font-semibold group">
                {t('shopNow')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/religious-books">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg backdrop-blur-sm">
                {t('religiousBooks')}
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center glass-effect rounded-2xl p-6 hover-scale">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-red-300" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 gradient-bg-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-display text-gradient mb-4">
              {isRTL ? 'لماذا تختار كتبكم؟' : 'Why Choose Kotobcom?'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'نحن نقدم تجربة تسوق استثنائية مع أفضل الخدمات'
                : 'We provide an exceptional shopping experience with the best services'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-premium rounded-2xl p-8 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 pulse-glow">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-display text-gradient mb-4">
              {isRTL ? 'تصفح حسب الفئة' : 'Browse by Category'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isRTL ? 'اختر من مجموعتنا المتنوعة' : 'Choose from our diverse collection'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link to="/general-books" className="group">
              <div className="relative overflow-hidden rounded-3xl h-80 hover-lift">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.9)), url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop)',
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="text-white">
                    <div className="text-5xl mb-4">📚</div>
                    <h3 className="text-3xl font-bold mb-2">{t('generalBooks')}</h3>
                    <p className="text-lg opacity-90 mb-4">
                      {isRTL ? 'روايات، علوم، تاريخ، وأكثر' : 'Novels, Science, History & More'}
                    </p>
                    <div className="inline-flex items-center text-white group-hover:translate-x-2 transition-transform">
                      <span className="mr-2">{isRTL ? 'استكشف الآن' : 'Explore Now'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/religious-books" className="group">
              <div className="relative overflow-hidden rounded-3xl h-80 hover-lift">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.9)), url(https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=800&h=600&fit=crop)',
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="text-white">
                    <div className="text-5xl mb-4">🕌</div>
                    <h3 className="text-3xl font-bold mb-2">{t('religiousBooks')}</h3>
                    <p className="text-lg opacity-90 mb-4">
                      {isRTL ? 'قرآن، حديث، فقه، وتفسير' : 'Quran, Hadith, Fiqh & Tafsir'}
                    </p>
                    <div className="inline-flex items-center text-white group-hover:translate-x-2 transition-transform">
                      <span className="mr-2">{isRTL ? 'استكشف الآن' : 'Explore Now'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 gradient-bg-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-display text-gradient mb-4">
              {t('featuredBooks')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isRTL ? 'اكتشف أفضل الكتب المختارة بعناية' : 'Discover our carefully curated bestsellers'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {featuredProducts.map((product) => (
              <div key={product.id} className="hover-lift">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {featuredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-12 h-12 text-red-500" />
              </div>
              <p className="text-muted-foreground text-lg">
                {isRTL ? 'قريباً... كتب مميزة' : 'Coming soon... Featured books'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-display mb-4">
              {isRTL ? 'ابق على اطلاع' : 'Stay Updated'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL 
                ? 'اشترك في نشرتنا الإخبارية لتحصل على أحدث الكتب والعروض الخاصة'
                : 'Subscribe to our newsletter for the latest books and special offers'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/70 backdrop-blur-sm focus-premium"
              />
              <Button className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-2xl font-semibold">
                {isRTL ? 'اشترك' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;