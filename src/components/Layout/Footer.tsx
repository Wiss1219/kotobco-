import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { BookOpen, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t, isRTL } = useTranslation();
  
  return (
    <footer className={cn("gradient-bg text-white mt-20", isRTL && "rtl")}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl font-arabic">كُتُبْكُمْ</span>
                <span className="text-sm opacity-80">Premium Bookstore</span>
              </div>
            </div>
            <p className="text-white/80 max-w-md leading-relaxed mb-6">
              {isRTL 
                ? "كتبكم - وجهتك الأولى للكتب العامة والدينية في تونس. نقدم أفضل الكتب بأسعار مناسبة مع خدمة توصيل سريعة وجودة عالية."
                : "Kotobcom - Your premier destination for general and religious books in Tunisia. We offer the best books at affordable prices with fast delivery service and premium quality."
              }
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              {isRTL ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-3 text-white/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/general-books" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  {t('generalBooks')}
                </Link>
              </li>
              <li>
                <Link to="/religious-books" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  {t('religiousBooks')}
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  {t('trackOrder')}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  {isRTL ? "من نحن" : "About Us"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              {isRTL ? "معلومات الاتصال" : "Contact Info"}
            </h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-red-300" />
                <span>{isRTL ? "المساكن، تونس" : "Msaken, Tunisia"}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-red-300" />
                <a href="tel:+21629381882" className="hover:text-white transition-colors">
                  +216 29 381 882
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-red-300" />
                <a href="mailto:info@kotobcom.tn" className="hover:text-white transition-colors">
                  info@kotobcom.tn
                </a>
              </li>
            </ul>
            
            {/* Working Hours */}
            <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <h4 className="font-semibold mb-2">
                {isRTL ? "ساعات العمل" : "Working Hours"}
              </h4>
              <p className="text-sm text-white/80">
                {isRTL ? "الأحد - الخميس: 9:00 - 18:00" : "Sun - Thu: 9:00 AM - 6:00 PM"}
              </p>
              <p className="text-sm text-white/80">
                {isRTL ? "الجمعة - السبت: 10:00 - 16:00" : "Fri - Sat: 10:00 AM - 4:00 PM"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              &copy; 2025 {isRTL ? "كتبكم. جميع الحقوق محفوظة." : "Kotobcom. All rights reserved."}
            </p>
            <div className="flex items-center text-white/60 text-sm">
              <span>{isRTL ? "صُنع بـ" : "Made with"}</span>
              <Heart className="h-4 w-4 mx-1 text-red-300" />
              <span>{isRTL ? "في تونس" : "in Tunisia"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};