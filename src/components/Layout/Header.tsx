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
  Star
} from 'lucide-react';

export const Header = () => {
  const { t, language, isRTL } = useTranslation();
  const { cart, setLanguage, isAdmin } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇹🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-red-100">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="h-2 w-2 text-yellow-800" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient font-arabic">
                كُتُبْكُمْ
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Premium Bookstore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/general-books" 
              className="text-sm font-semibold hover:text-red-600 transition-colors relative group"
            >
              {t('generalBooks')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/religious-books" 
              className="text-sm font-semibold hover:text-red-600 transition-colors relative group"
            >
              {t('religiousBooks')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/track-order" 
              className="text-sm font-semibold hover:text-red-600 transition-colors relative group"
            >
              {t('trackOrder')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-red-50 hover:text-red-600">
              <Search className="h-4 w-4" />
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-red-50 hover:text-red-600">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 card-premium">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={cn(
                      "flex items-center space-x-2 cursor-pointer hover:bg-red-50",
                      language === lang.code && "bg-red-50 text-red-600"
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-red-50 hover:text-red-600 relative">
              <Heart className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500"
              >
                0
              </Badge>
            </Button>

            {/* Admin Login/Dashboard Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/admin/login')}
              className="hidden sm:flex hover:bg-red-50 hover:text-red-600"
            >
              <User className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-red-50 hover:text-red-600 group"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 pulse-glow"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-red-50 hover:text-red-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-red-100 glass-effect">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <Link 
                to="/general-books" 
                className="text-sm font-semibold hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('generalBooks')}
              </Link>
              <Link 
                to="/religious-books" 
                className="text-sm font-semibold hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('religiousBooks')}
              </Link>
              <Link 
                to="/track-order" 
                className="text-sm font-semibold hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('trackOrder')}
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  navigate(isAdmin ? '/admin/dashboard' : '/admin/login');
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start hover:bg-red-50 hover:text-red-600"
              >
                <User className="h-4 w-4 mr-2" />
                {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
              </Button>
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-red-100">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Language</p>
                <div className="flex space-x-2">
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
                        "text-xs",
                        language === lang.code && "bg-red-600 hover:bg-red-700"
                      )}
                    >
                      {lang.flag} {lang.name}
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