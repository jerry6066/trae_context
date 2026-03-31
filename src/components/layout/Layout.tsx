import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Globe, BookOpen, LayoutDashboard, Users, User, LogIn } from 'lucide-react';
import clsx from 'clsx';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: '首页', path: '/', icon: Globe },
    { name: '控制台', path: '/dashboard', icon: LayoutDashboard },
    { name: '课程', path: '/courses', icon: BookOpen },
    { name: '社区', path: '/community', icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-pink-500" />
              <span className="text-white text-xl font-bold tracking-wider">LinguaNova</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">登录 / 注册</span>
            </Link>
            <Link
              to="/profile"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.7)] flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">个人中心</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-sans selection:bg-pink-500/30">
      <Navbar />
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
