
import React from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';

const ProductsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Sticker Wonderland 🌟
          </h1>
          <p className="text-gray-600 text-lg">
            Khám phá bộ sưu tập sticker dễ thương từ xứ sở thần tiên
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-500">
              Hãy thử tìm kiếm với từ khóa khác nhé!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
