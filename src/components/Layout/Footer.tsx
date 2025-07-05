import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Heart,
  Clock,
  Shield,
  Truck,
  Star,
  Award,
  Youtube,
  Linkedin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const { t, isRTL } = useTranslation();
  
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
  ];

  const quickLinks = [
    { href: '/', label: t('home') },
    { href: '/general-books', label: t('generalBooks') },
    { href: '/religious-books', label: t('religiousBooks') },
    { href: '/track-order', label: t('trackOrder') },
    { href: '#', label: isRTL ? 'من نحن' : 'About Us' },
    { href: '#', label: isRTL ? 'اتصل بنا' : 'Contact Us' },
  ];

  const legalLinks = [
    { href: '#', label: isRTL ? 'سياسة الخصوصية' : 'Privacy Policy' },
    { href: '#', label: isRTL ? 'شروط الخدمة' : 'Terms of Service' },
    { href: '#', label: isRTL ? 'سياسة الإرجاع' : 'Return Policy' },
    { href: '#', label: isRTL ? 'الأسئلة الشائعة' : 'FAQ' },
  ];

  const features = [
    {
      icon: Truck,
      title: isRTL ? 'توصيل مجاني' : 'Free Delivery',
      description: isRTL ? 'لجميع أنحاء تونس' : 'Across Tunisia'
    },
    {
      icon: Shield,
      title: isRTL ? 'ضمان الجودة' : 'Quality Guarantee',
      description: isRTL ? '100% أصلي' : '100% Original'
    },
    {
      icon: Award,
      title: isRTL ? 'خدمة ممتازة' : 'Excellent Service',
      description: isRTL ? 'دعم 24/7' : '24/7 Support'
    },
  ];
  
  return (
    <footer className={cn("bg-gray-900 text-white mt-16 relative overflow-hidden", isRTL && "rtl")}>
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-luxury opacity-10"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl font-arabic text-gradient-gold">كُتُبْكُمْ</span>
                <span className="text-sm opacity-80">Premium Digital Bookstore</span>
              </div>
            </div>
            
            <p className="text-white/80 max-w-lg leading-relaxed mb-6">
              {isRTL 
                ? "كتبكم - وجهتك الأولى للكتب العامة والدينية في تونس. نقدم أفضل الكتب بأسعار منافسة مع خدمة توصيل سريعة."
                : "Kotobcom - Your premier destination for general and religious books in Tunisia. We offer the finest books at competitive prices with fast delivery service."
              }
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/5 rounded-xl p-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="text-xs opacity-80">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className={cn(
                    "w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 group",
                    social.color
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              {isRTL ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-3 text-white/80">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Legal */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              {isRTL ? "معلومات الاتصال" : "Contact & Legal"}
            </h3>
            
            {/* Contact Info */}
            <ul className="space-y-3 text-white/80 mb-6">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-yellow-300" />
                <span>{isRTL ? "المساكن، تونس" : "Msaken, Tunisia"}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-yellow-300" />
                <a href="tel:+21629381882" className="hover:text-white transition-colors">
                  +216 29 381 882
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-yellow-300" />
                <a href="mailto:info@kotobcom.tn" className="hover:text-white transition-colors">
                  info@kotobcom.tn
                </a>
              </li>
            </ul>

            {/* Legal Links */}
            <ul className="space-y-2 text-white/70">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Working Hours Section */}
        <div className="bg-white/5 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Clock className="h-6 w-6 mx-auto mb-3 text-yellow-300" />
              <h4 className="font-semibold mb-2">
                {isRTL ? "ساعات العمل" : "Working Hours"}
              </h4>
              <p className="text-white/80 text-sm">
                {isRTL ? "الأحد - الخميس: 9:00 - 18:00" : "Sun - Thu: 9:00 AM - 6:00 PM"}
              </p>
              <p className="text-white/80 text-sm">
                {isRTL ? "الجمعة - السبت: 10:00 - 16:00" : "Fri - Sat: 10:00 AM - 4:00 PM"}
              </p>
            </div>
            
            <div>
              <Star className="h-6 w-6 mx-auto mb-3 text-yellow-300" />
              <h4 className="font-semibold mb-2">
                {isRTL ? "تقييم العملاء" : "Customer Rating"}
              </h4>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 text-sm">4.9/5 {isRTL ? "من 10,000+ تقييم" : "from 10,000+ reviews"}</p>
            </div>
            
            <div>
              <Award className="h-6 w-6 mx-auto mb-3 text-yellow-300" />
              <h4 className="font-semibold mb-2">
                {isRTL ? "جوائز ومعترف بها" : "Awards & Recognition"}
              </h4>
              <p className="text-white/80 text-sm">
                {isRTL ? "أفضل مكتبة رقمية 2024" : "Best Digital Bookstore 2024"}
              </p>
              <p className="text-white/80 text-sm">
                {isRTL ? "جائزة التميز في الخدمة" : "Excellence in Service Award"}
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white/5 rounded-2xl p-6 text-center mb-8">
          <h3 className="text-xl font-semibold mb-3">
            {isRTL ? "اشترك في نشرتنا الإخبارية" : "Subscribe to Our Newsletter"}
          </h3>
          <p className="text-white/80 mb-4 max-w-xl mx-auto">
            {isRTL 
              ? "احصل على أحدث الكتب والعروض الحصرية مباشرة في بريدك الإلكتروني"
              : "Get the latest books and exclusive offers delivered directly to your inbox"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium">
              {isRTL ? 'اشترك' : 'Subscribe'}
            </Button>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              &copy; 2025 {isRTL ? "كتبكم. جميع الحقوق محفوظة." : "Kotobcom. All rights reserved."}
            </p>
            <div className="flex items-center text-white/60 text-sm">
              <span>{isRTL ? "صُنع بـ" : "Made with"}</span>
              <Heart className="h-4 w-4 mx-2 text-red-400" />
              <span>{isRTL ? "في تونس" : "in Tunisia"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};