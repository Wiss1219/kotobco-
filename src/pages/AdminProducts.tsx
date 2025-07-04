import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useStore } from '@/store/useStore';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/Layout/AdminLayout';

const AdminProducts = () => {
  const { products, loadProducts } = useStore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    titleFr: '',
    description: '',
    descriptionAr: '',
    descriptionFr: '',
    price: '',
    imageUrl: '',
    category: 'general' as 'general' | 'religious',
    author: '',
    authorAr: '',
    authorFr: '',
    inStock: true,
    featured: false
  });

  useEffect(() => {
    loadProducts();

    // Set up real-time subscription for products
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          console.log('Products table changed:', payload);
          // Reload products when any change occurs
          loadProducts();
          
          // Show toast notification based on the event
          if (payload.eventType === 'INSERT') {
            toast({ title: 'New product added!' });
          } else if (payload.eventType === 'UPDATE') {
            toast({ title: 'Product updated!' });
          } else if (payload.eventType === 'DELETE') {
            toast({ title: 'Product deleted!' });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadProducts, toast]);

  const resetForm = () => {
    setFormData({
      title: '',
      titleAr: '',
      titleFr: '',
      description: '',
      descriptionAr: '',
      descriptionFr: '',
      price: '',
      imageUrl: '',
      category: 'general',
      author: '',
      authorAr: '',
      authorFr: '',
      inStock: true,
      featured: false
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      titleAr: product.titleAr,
      titleFr: product.titleFr,
      description: product.description,
      descriptionAr: product.descriptionAr,
      descriptionFr: product.descriptionFr,
      price: product.price.toString(),
      imageUrl: product.image,
      category: product.category,
      author: product.author || '',
      authorAr: product.authorAr || '',
      authorFr: product.authorFr || '',
      inStock: product.inStock,
      featured: product.featured || false
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const productData = {
        title: formData.title,
        title_ar: formData.titleAr,
        title_fr: formData.titleFr,
        description: formData.description,
        description_ar: formData.descriptionAr,
        description_fr: formData.descriptionFr,
        price: Number(formData.price),
        image_url: formData.imageUrl,
        category: formData.category,
        author: formData.author,
        author_ar: formData.authorAr,
        author_fr: formData.authorFr,
        in_stock: formData.inStock,
        featured: formData.featured,
        updated_at: new Date().toISOString()
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        // Don't show toast here, real-time subscription will handle it
      } else {
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
        // Don't show toast here, real-time subscription will handle it
      }

      setIsDialogOpen(false);
      resetForm();
      // Don't manually reload products, real-time subscription will handle it
    } catch (error) {
      console.error('Error saving product:', error);
      toast({ 
        title: 'Error saving product', 
        description: 'Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      
      // Don't show toast here, real-time subscription will handle it
      // Don't manually reload products, real-time subscription will handle it
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({ 
        title: 'Error deleting product', 
        description: 'Please try again.',
        variant: 'destructive'
      });
    }
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout pageTitle="Product Management">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products ({products.length})</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title">Title (English)</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="titleAr">Title (Arabic)</Label>
                  <Input
                    id="titleAr"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="titleFr">Title (French)</Label>
                  <Input
                    id="titleFr"
                    value={formData.titleFr}
                    onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="author">Author (English)</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="authorAr">Author (Arabic)</Label>
                  <Input
                    id="authorAr"
                    value={formData.authorAr}
                    onChange={(e) => setFormData({ ...formData, authorAr: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="authorFr">Author (French)</Label>
                  <Input
                    id="authorFr"
                    value={formData.authorFr}
                    onChange={(e) => setFormData({ ...formData, authorFr: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="description">Description (English)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="descriptionAr">Description (Arabic)</Label>
                  <Textarea
                    id="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="descriptionFr">Description (French)</Label>
                  <Textarea
                    id="descriptionFr"
                    value={formData.descriptionFr}
                    onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (TND)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'general' | 'religious' })}
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="general">General Books</option>
                    <option value="religious">Religious Books</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <span>Featured</span>
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.title}</p>
                      <p className="text-sm text-muted-foreground">{product.titleAr}</p>
                    </div>
                  </TableCell>
                  <TableCell>{product.author}</TableCell>
                  <TableCell>{product.price.toFixed(2)} TND</TableCell>
                  <TableCell>
                    <Badge variant={product.category === 'general' ? 'default' : 'secondary'}>
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant={product.inStock ? 'default' : 'destructive'}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                      {product.featured && (
                        <Badge variant="outline">Featured</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminProducts;
