import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTranslation } from '@/hooks/useTranslation';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Globe, 
  Search,
  BookOpen,
  Heart,
  User,
  Star,
  Sparkles,
  Bell
} from 'lucide-react';

export const Header = () => {
  const { t, language, isRTL } = useTranslation();
  const { cart, setLanguage, isAdmin } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇹🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-morphism border-b border-border/50 backdrop-blur-luxury">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-luxury group-hover:shadow-luxury-lg transition-all duration-300 group-hover:scale-105">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse-luxury">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient-primary font-arabic">
                كُتُبْكُمْ
              </span>
              <span className="text-xs text-muted-foreground -mt-1 font-medium">
                Premium Bookstore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/general-books" 
              className="text-sm font-semibold hover:text-primary transition-all duration-300 relative group py-2"
            >
              {t('generalBooks')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/religious-books" 
              className="text-sm font-semibold hover:text-primary transition-all duration-300 relative group py-2"
            >
              {t('religiousBooks')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/track-order" 
              className="text-sm font-semibold hover:text-primary transition-all duration-300 relative group py-2"
            >
              {t('trackOrder')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative hidden md:block">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder={isRTL ? "البحث..." : "Search..."}
                    className="w-64 px-4 py-2 rounded-full border border-border bg-background/50 backdrop-blur-sm focus-luxury transition-all duration-300"
                    autoFocus
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-glow"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-glow">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 card-luxury border-border/50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={cn(
                      "flex items-center space-x-3 cursor-pointer hover:bg-primary/10 transition-all duration-300",
                      language === lang.code && "bg-primary/10 text-primary"
                    )}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                    {language === lang.code && <Star className="h-4 w-4 ml-auto text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-glow relative">
              <Bell className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse-luxury"
              >
                3
              </Badge>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-glow relative">
              <Heart className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-pink-500 to-red-500"
              >
                0
              </Badge>
            </Button>

            {/* Admin Login/Dashboard Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/admin/login')}
              className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-glow"
            >
              <User className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-glow group"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-primary to-accent animate-pulse-luxury shadow-luxury"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-primary/10 hover:text-primary transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 glass-morphism">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder={isRTL ? "البحث في الكتب..." : "Search books..."}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background/50 backdrop-blur-sm focus-luxury"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              <Link 
                to="/general-books" 
                className="text-sm font-semibold hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('generalBooks')}
              </Link>
              <Link 
                to="/religious-books" 
                className="text-sm font-semibold hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('religiousBooks')}
              </Link>
              <Link 
                to="/track-order" 
                className="text-sm font-semibold hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('trackOrder')}
              </Link>
              
              <div className="flex items-center justify-between py-3 px-2">
                <span className="text-sm font-semibold">
                  {isRTL ? "الإشعارات" : "Notifications"}
                </span>
                <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-pink-500">
                  3
                </Badge>
              </div>

              <Button
                variant="ghost"
                onClick={() => {
                  navigate(isAdmin ? '/admin/dashboard' : '/admin/login');
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start hover:bg-primary/10 hover:text-primary py-3"
              >
                <User className="h-4 w-4 mr-3" />
                {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
              </Button>
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs font-semibold text-muted-foreground mb-3">
                  {isRTL ? "اللغة" : "Language"}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "text-xs flex flex-col items-center py-3 h-auto",
                        language === lang.code && "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      )}
                    >
                      <span className="text-lg mb-1">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};