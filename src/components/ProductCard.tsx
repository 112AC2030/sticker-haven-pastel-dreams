
import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart! 🛒",
      description: `${product.name} has been added to your cart`,
    });
  };

  const formatPrice = (price: number) => {
    return `NT$${price}`;
  };

  return (
    <Card className="sticker-card group overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-2 transition-colors" style={{ color: 'var(--group-hover-color, #1f2937)' }}>
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-transparent bg-clip-text" style={{
              background: 'linear-gradient(135deg, #FF9CB5, #FC809F)',
              WebkitBackgroundClip: 'text'
            }}>
              {formatPrice(product.price)}
            </span>
            <span className="text-xs px-2 py-1 rounded-full text-gray-600" style={{
              backgroundColor: '#FFE9EF'
            }}>
              {product.category}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full cute-button group-hover:shadow-xl"
        >
          <span className="mr-2">🛒</span>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
