
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, setCartOpen, wishlist, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/shop');
      setIsSearchOpen(false);
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? 'bg-noir-950 border-b border-white/10 py-4 shadow-lg' : 'bg-transparent border-b border-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center relative">
            
            {/* Mobile Menu Trigger */}
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white hover:text-gold-500 transition-colors">
              <Menu size={24} />
            </button>

            {/* Desktop Left Nav */}
            <div className="hidden md:flex gap-8 items-center text-xs tracking-[0.2em] font-medium uppercase">
              <Link to="/shop?gender=Women" className="hover:text-gold-500 transition-colors relative group">
                Women
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/shop?gender=Men" className="hover:text-gold-500 transition-colors relative group">
                Men
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/shop" className="hover:text-gold-500 transition-colors relative group">
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Link to="/" className="text-2xl md:text-4xl font-serif font-bold tracking-tighter text-white mix-blend-difference hover:opacity-80 transition-opacity">
                NOIR
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex gap-6 items-center z-20">
              <AnimatePresence mode="wait">
                {isSearchOpen ? (
                  <motion.form 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="hidden md:flex items-center border-b border-white/30"
                    onSubmit={handleSearchSubmit}
                  >
                    <input 
                      ref={searchInputRef}
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="bg-transparent border-none outline-none text-white text-sm w-full py-1 placeholder:text-gray-500"
                    />
                    <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-2 text-gray-400 hover:text-white">
                      <X size={14} />
                    </button>
                  </motion.form>
                ) : (
                  <button 
                    onClick={() => setIsSearchOpen(true)} 
                    className="hidden md:block hover:text-gold-500 transition-colors"
                  >
                    <Search size={20} />
                  </button>
                )}
              </AnimatePresence>

              <Link to="/shop" className="relative hover:text-gold-500 transition-colors hidden md:block">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span>
                )}
              </Link>
              <button onClick={() => setCartOpen(true)} className="relative hover:text-gold-500 transition-colors">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-noir-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-noir-950/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="font-serif text-2xl tracking-tighter">NOIR</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-gold-500 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 p-8 flex-1 justify-center">
              {[
                { name: 'Home', path: '/' },
                { name: 'Women', path: '/shop?gender=Women' },
                { name: 'Men', path: '/shop?gender=Men' },
                { name: 'Accessories', path: '/shop?category=Accessories' },
                { name: 'Editorial', path: '/' }
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-serif text-white hover:text-gold-500 transition-colors block"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="p-8 border-t border-white/10 grid grid-cols-2 gap-4 text-sm text-gray-400">
              <Link to="/shop" className="hover:text-white transition-colors">Account</Link>
              <Link to="/shop" className="hover:text-white transition-colors">Search</Link>
              <Link to="/shop" className="hover:text-white transition-colors">Wishlist ({wishlist.length})</Link>
              <Link to="/shop" className="hover:text-white transition-colors">Support</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
