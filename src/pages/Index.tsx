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
  Heart,
  Award,
  Zap,
  Globe,
  Clock,
  CheckCircle,
  Sparkles
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
      color: 'text-yellow-600'
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: isRTL ? 'مجموعة واسعة' : 'Vast Collection',
      description: isRTL ? 'آلاف الكتب في جميع المجالات والتخصصات' : 'Thousands of books across all fields and specializations',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Truck,
      title: isRTL ? 'توصيل مجاني' : 'Free Delivery',
      description: isRTL ? 'توصيل مجاني سريع لجميع أنحاء تونس' : 'Fast free delivery across all of Tunisia',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: isRTL ? 'ضمان الجودة' : 'Quality Guarantee',
      description: isRTL ? 'كتب أصلية بأفضل جودة وضمان شامل' : 'Original books with premium quality and full warranty',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: Zap,
      title: isRTL ? 'خدمة سريعة' : 'Lightning Fast',
      description: isRTL ? 'معالجة فورية للطلبات وخدمة عملاء متميزة' : 'Instant order processing and exceptional customer service',
      gradient: 'from-yellow-500 to-orange-500'
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
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-hero"></div>
        <div className="absolute inset-0 pattern-luxury opacity-40"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/15 rounded-full blur-md animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-4">
          {/* Premium Badge */}
          <div className={cn("mb-8 animate-fade-in-up", isLoaded && "animate-fade-in-up")}>
            <div className="inline-flex items-center px-6 py-3 glass-morphism rounded-full border border-white/20 mb-8">
              <Sparkles className="w-5 h-5 mr-3 text-yellow-300 animate-pulse-luxury" />
              <span className="text-sm font-semibold">
                {isRTL ? 'المكتبة الرقمية الأولى في تونس' : '#1 Premium Digital Bookstore in Tunisia'}
              </span>
              <Star className="w-5 h-5 ml-3 text-yellow-300" />
            </div>
          </div>
          
          {/* Hero Title */}
          <h1 className="text-hero font-display mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="block mb-4">
              {isRTL ? 'مرحباً بكم في عالم' : 'Welcome to the World of'}
            </span>
            <span className="block text-gradient-gold text-shimmer">
              {isRTL ? 'كُتُبْكُمْ' : 'Kotobcom'}
            </span>
          </h1>
          
          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {isRTL 
              ? 'اكتشف عالماً لا محدود من المعرفة والثقافة مع أرقى مجموعة كتب في تونس. جودة استثنائية، أسعار منافسة، وتجربة تسوق لا تُنسى.'
              : 'Discover an unlimited world of knowledge and culture with the finest book collection in Tunisia. Exceptional quality, competitive prices, and an unforgettable shopping experience.'
            }
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link to="/general-books">
              <Button size="lg" className="btn-luxury text-white px-10 py-4 text-lg font-semibold group hover-glow">
                <BookOpen className="mr-3 w-6 h-6" />
                {t('shopNow')}
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/religious-books">
              <Button variant="outline" size="lg" className="glass-morphism border-white/30 text-white hover:bg-white/20 px-10 py-4 text-lg backdrop-blur-luxury">
                <Star className="mr-3 w-6 h-6" />
                {t('religiousBooks')}
              </Button>
            </Link>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center glass-card rounded-3xl p-8 hover-lift-premium group">
                <div className={cn("w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center", stat.color, "bg-white/10 group-hover:bg-white/20 transition-colors")}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2 text-gradient-gold">{stat.value}</div>
                <div className="text-sm opacity-80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Award className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {isRTL ? 'مميزات حصرية' : 'Premium Features'}
              </span>
            </div>
            <h2 className="text-display text-gradient-primary mb-6 font-display">
              {isRTL ? 'لماذا تختار كتبكم؟' : 'Why Choose Kotobcom?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {isRTL 
                ? 'نحن نقدم تجربة تسوق استثنائية مع أفضل الخدمات والمميزات الحصرية'
                : 'We provide an exceptional shopping experience with the best services and exclusive features'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-luxury rounded-3xl p-8 text-center hover-lift-premium group">
                <div className={cn("w-20 h-20 bg-gradient-to-br rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-luxury", feature.gradient)}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-display text-gradient-primary mb-6 font-display">
              {isRTL ? 'تصفح حسب الفئة' : 'Browse by Category'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isRTL ? 'اختر من مجموعتنا المتنوعة والمتميزة' : 'Choose from our diverse and distinguished collection'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Link to="/general-books" className="group">
              <div className="relative overflow-hidden rounded-3xl h-96 hover-lift-premium">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.8)), url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop)',
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col justify-end p-10">
                  <div className="text-white">
                    <div className="text-6xl mb-6 animate-float">📚</div>
                    <h3 className="text-3xl font-bold mb-4 font-display">{t('generalBooks')}</h3>
                    <p className="text-lg opacity-90 mb-6 leading-relaxed">
                      {isRTL ? 'روايات، علوم، تاريخ، فلسفة، وأكثر من ذلك بكثير' : 'Novels, Science, History, Philosophy & Much More'}
                    </p>
                    <div className="inline-flex items-center text-white group-hover:translate-x-2 transition-transform bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
                      <span className="mr-3 font-semibold">{isRTL ? 'استكشف الآن' : 'Explore Now'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/religious-books" className="group">
              <div className="relative overflow-hidden rounded-3xl h-96 hover-lift-premium">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(59, 130, 246, 0.8)), url(https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=800&h=600&fit=crop)',
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col justify-end p-10">
                  <div className="text-white">
                    <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '1s' }}>🕌</div>
                    <h3 className="text-3xl font-bold mb-4 font-display">{t('religiousBooks')}</h3>
                    <p className="text-lg opacity-90 mb-6 leading-relaxed">
                      {isRTL ? 'قرآن كريم، أحاديث شريفة، فقه، تفسير، وعلوم دينية' : 'Holy Quran, Hadith, Fiqh, Tafsir & Religious Sciences'}
                    </p>
                    <div className="inline-flex items-center text-white group-hover:translate-x-2 transition-transform bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
                      <span className="mr-3 font-semibold">{isRTL ? 'استكشف الآن' : 'Explore Now'}</span>
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
      <section className="py-24 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Star className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {isRTL ? 'مختارات خاصة' : 'Special Selection'}
              </span>
            </div>
            <h2 className="text-display text-gradient-primary mb-6 font-display">
              {t('featuredBooks')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {isRTL ? 'اكتشف أفضل الكتب المختارة بعناية من قبل خبرائنا' : 'Discover the finest books carefully selected by our experts'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-8xl mx-auto">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="hover-lift-premium" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {featuredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-luxury">
                <BookOpen className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{isRTL ? 'قريباً...' : 'Coming Soon...'}</h3>
              <p className="text-muted-foreground text-lg">
                {isRTL ? 'كتب مميزة ومختارة بعناية' : 'Premium and carefully selected books'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-display text-gradient-primary mb-6 font-display">
              {isRTL ? 'آراء عملائنا' : 'What Our Customers Say'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {isRTL ? 'تجارب حقيقية من عملائنا الكرام' : 'Real experiences from our valued customers'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-luxury rounded-3xl p-8 text-center hover-lift-premium">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-8">
              <Globe className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">
                {isRTL ? 'انضم إلى مجتمعنا' : 'Join Our Community'}
              </span>
            </div>
            <h2 className="text-display mb-6 font-display">
              {isRTL ? 'ابق على اطلاع دائم' : 'Stay Always Updated'}
            </h2>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              {isRTL 
                ? 'اشترك في نشرتنا الإخبارية لتحصل على أحدث الكتب والعروض الحصرية والمحتوى المميز'
                : 'Subscribe to our newsletter for the latest books, exclusive offers, and premium content'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                className="flex-1 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/70 backdrop-blur-luxury focus-luxury"
              />
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold hover-glow">
                <CheckCircle className="w-5 h-5 mr-2" />
                {isRTL ? 'اشترك الآن' : 'Subscribe Now'}
              </Button>
            </div>
            <p className="text-sm opacity-70 mt-4">
              {isRTL ? 'لا نرسل رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.' : 'No spam. You can unsubscribe at any time.'}
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;