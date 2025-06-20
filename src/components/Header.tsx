
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Filter, LogOut, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b-2 border-pastel-pink cute-shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 cute-hover">
            <div className="text-3xl animate-bounce-cute">🌸</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Sticker Shop
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`cute-hover px-3 py-2 rounded-full transition-all duration-300 ${
                location.pathname === '/' ? 'bg-pastel-pink text-gray-700' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sản phẩm
            </Link>
            <Link 
              to="/search" 
              className={`cute-hover px-3 py-2 rounded-full transition-all duration-300 flex items-center space-x-1 ${
                location.pathname === '/search' ? 'bg-pastel-mint text-gray-700' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Tìm kiếm</span>
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative cute-hover">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse-soft">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User menu */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 cute-hover">
                    <div className="text-2xl animate-bounce-cute">{user.avatar}</div>
                    <span className="hidden sm:inline text-gray-700">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border-2 border-pastel-pink cute-shadow" align="end">
                  <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer hover:bg-pastel-pink">
                    <User className="w-4 h-4" />
                    <span>Thông tin cá nhân</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center space-x-2 cursor-pointer hover:bg-pastel-pink text-red-600"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="cute-button">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex justify-center space-x-4">
          <Link 
            to="/" 
            className={`cute-hover px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              location.pathname === '/' ? 'bg-pastel-pink text-gray-700' : 'text-gray-600'
            }`}
          >
            Sản phẩm
          </Link>
          <Link 
            to="/search" 
            className={`cute-hover px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center space-x-1 ${
              location.pathname === '/search' ? 'bg-pastel-mint text-gray-700' : 'text-gray-600'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Tìm kiếm</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
