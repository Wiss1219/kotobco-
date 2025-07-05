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
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gradient-primary font-arabic">
                كُتُبْكُمْ
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Bookstore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/general-books" 
              className="text-sm font-medium hover:text-primary transition-colors relative group py-2"
            >
              {t('generalBooks')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/religious-books" 
              className="text-sm font-medium hover:text-primary transition-colors relative group py-2"
            >
              {t('religiousBooks')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/track-order" 
              className="text-sm font-medium hover:text-primary transition-colors relative group py-2"
            >
              {t('trackOrder')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative hidden md:block">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder={isRTL ? "البحث..." : "Search..."}
                    className="w-48 px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    autoFocus
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-colors">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={cn(
                      "flex items-center space-x-2 cursor-pointer",
                      language === lang.code && "bg-primary/10 text-primary"
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                    {language === lang.code && <Star className="h-3 w-3 ml-auto" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-colors relative">
              <Bell className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-colors relative">
              <Heart className="h-4 w-4" />
            </Button>

            {/* Admin Login/Dashboard Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/admin/login')}
              className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <User className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-primary"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-primary/10 hover:text-primary transition-colors"
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
          <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2 px-4 py-4">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <input 
                  type="text" 
                  placeholder={isRTL ? "البحث في الكتب..." : "Search books..."}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              <Link 
                to="/general-books" 
                className="text-sm font-medium hover:text-primary transition-colors py-2 px-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('generalBooks')}
              </Link>
              <Link 
                to="/religious-books" 
                className="text-sm font-medium hover:text-primary transition-colors py-2 px-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('religiousBooks')}
              </Link>
              <Link 
                to="/track-order" 
                className="text-sm font-medium hover:text-primary transition-colors py-2 px-2 rounded-lg hover:bg-primary/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('trackOrder')}
              </Link>
              
              <div className="flex items-center justify-between py-2 px-2">
                <span className="text-sm font-medium">
                  {isRTL ? "الإشعارات" : "Notifications"}
                </span>
                <Badge variant="destructive" className="bg-primary">
                  3
                </Badge>
              </div>

              <Button
                variant="ghost"
                onClick={() => {
                  navigate(isAdmin ? '/admin/dashboard' : '/admin/login');
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start hover:bg-primary/10 hover:text-primary py-2"
              >
                <User className="h-4 w-4 mr-2" />
                {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
              </Button>
              
              {/* Mobile Language Selector */}
              <div className="pt-3 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground mb-2">
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
                      className="text-xs flex flex-col items-center py-2 h-auto"
                    >
                      <span className="text-base mb-1">{lang.flag}</span>
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