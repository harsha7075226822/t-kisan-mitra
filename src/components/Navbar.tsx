import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic, Globe, Settings, User, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  // Get user data from localStorage if on dashboard
  const userData = isDashboard ? JSON.parse(localStorage.getItem('kisanUser') || '{}') : null;

  // Set global language in localStorage for other components to use
  useEffect(() => {
    localStorage.setItem('appLanguage', selectedLanguage.toLowerCase());
    // Dispatch custom event to notify other components of language change
    window.dispatchEvent(new CustomEvent('languageChange', { detail: selectedLanguage.toLowerCase() }));
  }, [selectedLanguage]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🌾' },
    { name: 'Weather', path: '/weather', icon: '🌤️' },
    { name: 'Market Insights', path: '/market', icon: '📊' },
    { name: 'Education', path: '/education', icon: '📚' },
    { name: 'Government Schemes', path: '/schemes', icon: '🏛️' },
    { name: 'Online Mandi', path: '/mandi', icon: '🛒' },
    { name: 'Voice Assistant', path: '/voice', icon: '🎤' },
    { name: 'Crop Scanner', path: '/scanner', icon: '📷' },
    { name: 'Seeds Container', path: '/seeds', icon: '🌱' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b-2 border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl">🌾</div>
              <span className="text-xl font-bold text-green-800">Smart AgriConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-700 hover:text-green-800 hover:bg-green-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Global Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-green-700 border-green-300">
                  <Globe className="w-4 h-4 mr-2" />
                  {selectedLanguage}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.name)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Voice Assistant Button */}
            <Link to="/voice">
              <Button variant="outline" size="sm">
                <Mic className="w-4 h-4" />
              </Button>
            </Link>

            {/* Seeds Container Button */}
            <Link to="/seeds">
              <Button variant="outline" size="sm">
                <Sprout className="w-4 h-4" />
              </Button>
            </Link>

            {/* Profile Section - Show only on dashboard */}
            {isDashboard && userData.name && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userData.profilePhoto || ''} />
                      <AvatarFallback className="bg-green-100 text-green-800">
                        {userData.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">{userData.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white" align="end">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem('kisanUser');
                      window.location.href = '/login';
                    }}
                    className="text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-700 hover:text-green-800 hover:bg-green-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile Language Options */}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <div className="px-3 py-2 text-sm font-medium text-gray-500">Language</div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.name);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50"
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
            
            {isDashboard && userData.name && (
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="flex items-center px-3 py-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={userData.profilePhoto || ''} />
                    <AvatarFallback className="bg-green-100 text-green-800">
                      {userData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{userData.name}</span>
                </div>
                <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50">
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </button>
                <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('kisanUser');
                    window.location.href = '/login';
                  }}
                  className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
