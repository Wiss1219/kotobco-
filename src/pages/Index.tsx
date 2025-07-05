import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useTranslation } from '@/hooks/useTranslation';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { 
  ArrowRight, 
  BookOpen, 
  Star, 
  Users, 
  Truck, 
  Shield, 
  Award,
  Zap,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Heart
} from 'lucide-react';

const Index = () => {
  const { t, isRTL } = useTranslation();
  const { products, loadProducts } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    loadProducts();
    setIsLoaded(true);
  }, [loadProducts]);
  
  const featuredProducts = products.filter(p => p.featured);
  const generalBooks = products.filter(p => p.category === 'general').slice(0, 4);
  const religiousBooks = products.filter(p => p.category === 'religious').slice(0, 4);

  const stats = [
    { 
      icon: BookOpen, 
      value: '10,000+', 
      label: isRTL ? 'كتاب متاح' : 'Books Available',
      color: 'text-blue-600'
    },
    { 
      icon: Users, 
      value: '50,000+', 
      label: isRTL ? 'عميل راضي' : 'Happy Customers',
      color: 'text-green-600'
    },
    { 
      icon: Truck, 
      value: '24h', 
      label: isRTL ? 'توصيل سريع' : 'Fast Delivery',
      color: 'text-purple-600'
    },
    { 
      icon: Award, 
      value: '100%', 
      label: isRTL ? 'ضمان الجودة' : 'Quality Guarantee',
      color: 'text-red-600'
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: isRTL ? 'مجموعة واسعة' : 'Vast Collection',
      description: isRTL ? 'آلاف الكتب في جميع المجالات والتخصصات' : 'Thousands of books across all fields and specializations',
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
    },
    {
      icon: Truck,
      title: isRTL ? 'توصيل مجاني' : 'Free Delivery',
      description: isRTL ? 'توصيل مجاني سريع لجميع أنحاء تونس' : 'Fast free delivery across all of Tunisia',
      color: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
    },
    {
      icon: Shield,
      title: isRTL ? 'ضمان الجودة' : 'Quality Guarantee',
      description: isRTL ? 'كتب أصلية بأفضل جودة وضمان شامل' : 'Original books with premium quality and full warranty',
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
    },
    {
      icon: Zap,
      title: isRTL ? 'خدمة سريعة' : 'Lightning Fast',
      description: isRTL ? 'معالجة فورية للطلبات وخدمة عملاء متميزة' : 'Instant order processing and exceptional customer service',
      color: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
    }
  ];

  const testimonials = [
    {
      name: isRTL ? 'أحمد محمد' : 'Ahmed Mohamed',
      text: isRTL ? 'خدمة ممتازة وكتب عالية الجودة. أنصح بشدة!' : 'Excellent service and high-quality books. Highly recommended!',
      rating: 5,
      location: isRTL ? 'تونس العاصمة' : 'Tunis'
    },
    {
      name: isRTL ? 'فاطمة الزهراء' : 'Fatima Zahra',
      text: isRTL ? 'أفضل مكتبة إلكترونية في تونس. التوصيل سريع والأسعار معقولة' : 'Best online bookstore in Tunisia. Fast delivery and reasonable prices',
      rating: 5,
      location: isRTL ? 'صفاقس' : 'Sfax'
    },
    {
      name: isRTL ? 'محمد علي' : 'Mohamed Ali',
      text: isRTL ? 'مجموعة رائعة من الكتب الدينية والعامة. جودة عالية' : 'Amazing collection of religious and general books. High quality',
      rating: 5,
      location: isRTL ? 'سوسة' : 'Sousse'
    }
  ];
  
  return (
    <div className={cn("min-h-screen scroll-smooth", isRTL && "rtl")}>
      <Header />
      
      {/* Hero Section - Red & White Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Red Gradient Background */}
        <div className="absolute inset-0 gradient-hero"></div>
        <div className="absolute inset-0 pattern-luxury opacity-30"></div>
        
        {/* Subtle Floating Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          {/* Clean Badge */}
          <div className={cn("mb-8 animate-fade-in-up", isLoaded && "animate-fade-in-up")}>
            <div className="inline-flex items-center px-4 py-2 glass-morphism rounded-full border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">
                {isRTL ? 'المكتبة الرقمية الأولى في تونس' : '#1 Digital Bookstore in Tunisia'}
              </span>
            </div>
          </div>
          
          {/* Clean Hero Title */}
          <h1 className="text-hero font-display mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="block mb-2">
              {isRTL ? 'مرحباً بكم في' : 'Welcome to'}
            </span>
            <span className="block text-gradient-gold">
              {isRTL ? 'كُتُبْكُمْ' : 'Kotobcom'}
            </span>
          </h1>
          
          {/* Clean Subtitle */}
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {isRTL 
              ? 'اكتشف عالماً من المعرفة والثقافة مع أفضل مجموعة كتب في تونس'
              : 'Discover a world of knowledge and culture with the finest book collection in Tunisia'
            }
          </p>
          
          {/* Clean CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link to="/general-books">
              <Button size="lg" className="btn-luxury text-white px-8 py-3 text-lg font-medium group">
                <BookOpen className="mr-2 w-5 h-5" />
                {t('shopNow')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/religious-books">
              <Button variant="outline" size="lg" className="glass-morphism border-white/30 text-white hover:bg-white/20 px-8 py-3 text-lg">
                <Star className="mr-2 w-5 h-5" />
                {t('religiousBooks')}
              </Button>
            </Link>
          </div>
          
          {/* Fixed Stats Grid with Better Visibility */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center stats-card-light rounded-2xl p-6 hover-lift-premium">
                <div className={cn("w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center", stat.color, "bg-white/20")}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold mb-1 stats-text-light">{stat.value}</div>
                <div className="text-sm stats-text-light opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section - Clean Red & White */}
      <section className="py-20 bg-red-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-full mb-4">
              <Award className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {isRTL ? 'مميزات حصرية' : 'Why Choose Us'}
              </span>
            </div>
            <h2 className="text-display text-gradient-primary mb-4 font-display">
              {isRTL ? 'لماذا تختار كتبكم؟' : 'Premium Features'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isRTL 
                ? 'نحن نقدم تجربة تسوق استثنائية مع أفضل الخدمات'
                : 'We provide an exceptional shopping experience with premium services'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center hover-lift-premium shadow-lg border border-red-100">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4", feature.color)}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section - Fixed Text Visibility */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-display text-gradient-primary mb-4 font-display">
              {isRTL ? 'تصفح حسب الفئة' : 'Browse Categories'}
            </h2>
            <p className="text-lg text-gray-600">
              {isRTL ? 'اختر من مجموعتنا المتنوعة' : 'Choose from our diverse collection'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link to="/general-books" className="group">
              <div className="relative overflow-hidden rounded-2xl h-80 hover-lift-premium">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.7)), url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop)',
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="text-white">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-2xl font-bold mb-2 category-text-light">{t('generalBooks')}</h3>
                    <p className="text-sm opacity-90 mb-4 category-text-light">
                      {isRTL ? 'روايات، علوم، تاريخ، فلسفة' : 'Novels, Science, History, Philosophy'}
                    </p>
                    <div className="inline-flex items-center text-white group-hover:translate-x-1 transition-transform">
                      <span className="mr-2 text-sm font-medium">{isRTL ? 'استكشف الآن' : 'Explore Now'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/religious-books" className="group">
              <div className="relative overflow-hidden rounded-2xl h-80 hover-lift-premium">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(59, 130, 246, 0.7)), url(https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=800&h=600&fit=crop)',
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="text-white">
                    <div className="text-4xl mb-4">🕌</div>
                    <h3 className="text-2xl font-bold mb-2 category-text-light">{t('religiousBooks')}</h3>
                    <p className="text-sm opacity-90 mb-4 category-text-light">
                      {isRTL ? 'قرآن كريم، أحاديث، فقه، تفسير' : 'Holy Quran, Hadith, Fiqh, Tafsir'}
                    </p>
                    <div className="inline-flex items-center text-white group-hover:translate-x-1 transition-transform">
                      <span className="mr-2 text-sm font-medium">{isRTL ? 'استكشف الآن' : 'Explore Now'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products - Red & White Theme */}
      <section className="py-20 bg-red-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-full mb-4">
              <Star className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {isRTL ? 'مختارات خاصة' : 'Featured'}
              </span>
            </div>
            <h2 className="text-display text-gradient-primary mb-4 font-display">
              {t('featuredBooks')}
            </h2>
            <p className="text-lg text-gray-600">
              {isRTL ? 'اكتشف أفضل الكتب المختارة' : 'Discover our finest selected books'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="hover-lift-premium" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {featuredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{isRTL ? 'قريباً...' : 'Coming Soon...'}</h3>
              <p className="text-gray-600">
                {isRTL ? 'كتب مميزة ومختارة بعناية' : 'Premium and carefully selected books'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials - Clean White Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-display text-gradient-primary mb-4 font-display">
              {isRTL ? 'آراء عملائنا' : 'Customer Reviews'}
            </h2>
            <p className="text-lg text-gray-600">
              {isRTL ? 'تجارب حقيقية من عملائنا' : 'Real experiences from our customers'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center hover-lift-premium shadow-lg border border-red-100">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Red Theme */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-display mb-4 font-display">
              {isRTL ? 'ابق على اطلاع دائم' : 'Stay Updated'}
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {isRTL 
                ? 'اشترك في نشرتنا الإخبارية لتحصل على أحدث الكتب والعروض'
                : 'Subscribe to our newsletter for the latest books and exclusive offers'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
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