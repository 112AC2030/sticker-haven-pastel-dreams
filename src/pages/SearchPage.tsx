
import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
type CategoryFilter = 'all' | 'characters' | 'scenes' | 'nature' | 'objects';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchTerm, sortBy, categoryFilter]);

  const categoryLabels = {
    all: 'All',
    characters: 'Characters',
    scenes: 'Scenes',
    nature: 'Nature',
    objects: 'Objects'
  };

  const sortLabels = {
    'name-asc': 'Name A-Z',
    'name-desc': 'Name Z-A',
    'price-asc': 'Price Low → High',
    'price-desc': 'Price High → Low'
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Search & Filter Products 🔍
          </h1>
          <p className="text-gray-600 text-lg">
            Find your favorite stickers
          </p>
        </div>

        {/* Search and Filter Controls */}
        <Card className="mb-8 cute-shadow border-2 border-pastel-mint">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search stickers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 cute-input"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as CategoryFilter)}>
                <SelectTrigger className="cute-input">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-pastel-pink cute-shadow">
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="hover:bg-pastel-pink">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Options */}
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="cute-input">
                  {sortBy.includes('asc') ? (
                    <SortAsc className="w-4 h-4 mr-2" />
                  ) : (
                    <SortDesc className="w-4 h-4 mr-2" />
                  )}
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-pastel-lavender cute-shadow">
                  {Object.entries(sortLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="hover:bg-pastel-lavender">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || categoryFilter !== 'all') && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <span className="bg-pastel-pink px-3 py-1 rounded-full text-sm">
                    🔍 "{searchTerm}"
                  </span>
                )}
                {categoryFilter !== 'all' && (
                  <span className="bg-pastel-mint px-3 py-1 rounded-full text-sm">
                    📂 {categoryLabels[categoryFilter]}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                  }}
                  className="text-pink-600 hover:text-pink-800 text-sm"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-pink-600">{filteredAndSortedProducts.length}</span> products
            {searchTerm && (
              <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 animate-bounce-cute">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Try searching with different keywords or change your filters!
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setSortBy('name-asc');
              }}
              className="cute-button"
            >
              View all products
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
