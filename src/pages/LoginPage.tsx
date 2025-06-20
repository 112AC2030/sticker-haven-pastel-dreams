
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (login(username, password)) {
      toast({
        title: "Đăng nhập thành công! 🎉",
        description: "Chào mừng bạn đến với Sticker Shop",
      });
      navigate('/');
    } else {
      toast({
        title: "Đăng nhập thất bại! ❌",
        description: "Tên đăng nhập hoặc mật khẩu không đúng",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 pastel-gradient opacity-50" />
      <Card className="w-full max-w-md relative z-10 cute-shadow border-2 border-pastel-pink">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4 animate-bounce-cute">🌸</div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Đăng nhập
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Chào mừng bạn trở lại Sticker Shop!
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-semibold">
                Tên đăng nhập
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                className="cute-input"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="cute-input pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-pastel-sky p-4 rounded-xl border-2 border-pastel-sky-dark">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Thông tin đăng nhập demo:</strong>
              </p>
              <p className="text-sm">
                <span className="font-mono bg-white px-2 py-1 rounded">username: guest</span>
              </p>
              <p className="text-sm">
                <span className="font-mono bg-white px-2 py-1 rounded">password: guest</span>
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full cute-button text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-600 border-t-transparent" />
                  <span>Đang đăng nhập...</span>
                </div>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Đăng nhập
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-pink-600 hover:text-pink-800 font-semibold cute-hover"
            >
              ← Quay lại trang chủ
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
