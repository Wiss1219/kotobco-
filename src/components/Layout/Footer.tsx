import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export const Footer = () => {
  const { t, isRTL } = useTranslation();
  
  return (
    <footer className={cn("bg-primary text-primary-foreground mt-20", isRTL && "rtl")}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">ك</span>
              </div>
              <span className="font-bold text-xl">كتبكم</span>
            </div>
            <p className="text-primary-foreground/80 max-w-md">
              {isRTL 
                ? "كتبكم - وجهتك الأولى للكتب العامة والدينية في تونس. نقدم أفضل الكتب بأسعار مناسبة مع خدمة توصيل سريعة."
                : "Kotobcom - Your premier destination for general and religious books in Tunisia. We offer the best books at affordable prices with fast delivery service."
              }
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">
              {isRTL ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="/" className="hover:text-white transition-colors">{t('home')}</a></li>
              <li><a href="/general-books" className="hover:text-white transition-colors">{t('generalBooks')}</a></li>
              <li><a href="/religious-books" className="hover:text-white transition-colors">{t('religiousBooks')}</a></li>
              <li><a href="/track-order" className="hover:text-white transition-colors">{t('trackOrder')}</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">
              {isRTL ? "معلومات الاتصال" : "Contact Info"}
            </h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>{isRTL ? "المساكن، تونس" : "Msaken, Tunisia"}</li>
              <li>+216 29 381 882</li>
              <li>info@kotobcom.tn</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2025 {isRTL ? "كتبكم. جميع الحقوق محفوظة." : "Kotobcom. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
};
