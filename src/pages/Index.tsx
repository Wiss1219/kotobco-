import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useTranslation } from '@/hooks/useTranslation';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const Index = () => {
  const { t, isRTL } = useTranslation();
  const { products, loadProducts } = useStore();
  
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  
  const featuredProducts = products.filter(p => p.featured);
  
  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pattern-bg"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://videos.openai.com/vg-assets/assets%2Ftask_01jz8vawree2dbcc8azb18v4p6%2F1751570120_img_1.webp?st=2025-07-03T17%3A59%3A17Z&se=2025-07-09T18%3A59%3A17Z&sks=b&skt=2025-07-03T17%3A59%3A17Z&ske=2025-07-09T18%3A59%3A17Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=X3IwEvmUHeVwQ7uPJMJVnDDIe0uWYE1%2BBBn0zubIu9g%3D&az=oaivgprodscus)',
            filter: 'brightness(0.7)'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-arabic">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t('heroSubtitle')}
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
            {t('shopNow')}
          </Button>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/general-books">
              <div className="group relative overflow-hidden rounded-2xl h-64 hover-lift">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop)',
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-2xl font-bold">{t('generalBooks')}</h3>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/religious-books">
              <div className="group relative overflow-hidden rounded-2xl h-64 hover-lift">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=600&h=400&fit=crop)',
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">🕌</div>
                    <h3 className="text-2xl font-bold">{t('religiousBooks')}</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('featuredBooks')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onClick={() => {/* Navigate to product detail */}}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
