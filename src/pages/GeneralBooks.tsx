
import { useState, useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const GeneralBooks = () => {
  const { t, isRTL } = useTranslation();
  const { products, loadProducts } = useStore();
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  
  const generalBooks = products.filter(p => p.category === 'general');
  
  const filteredBooks = generalBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.titleAr.includes(searchTerm) ||
    book.titleFr.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
      default:
        return a.title.localeCompare(b.title);
    }
  });
  
  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('generalBooks')}</h1>
          <p className="text-muted-foreground">
            {isRTL 
              ? "اكتشف مجموعتنا الواسعة من الكتب العامة في مختلف المجالات"
              : "Discover our wide collection of general books across various fields"
            }
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder={isRTL ? "البحث عن كتاب..." : "Search for books..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">
                {isRTL ? "ترتيب أبجدي" : "Sort by Name"}
              </SelectItem>
              <SelectItem value="price-low">
                {isRTL ? "السعر من الأقل للأعلى" : "Price: Low to High"}
              </SelectItem>
              <SelectItem value="price-high">
                {isRTL ? "السعر من الأعلى للأقل" : "Price: High to Low"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedBooks.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onClick={() => {/* Navigate to product detail */}}
            />
          ))}
        </div>
        
        {sortedBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {isRTL ? "لا توجد كتب متاحة" : "No books found"}
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default GeneralBooks;
