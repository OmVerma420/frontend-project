// @ts-nocheck
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './src/components/Navbar';
import { Home } from './src/pages/Home';
import { Shop } from './src/pages/Shop';
import { ProductDetail } from './src/pages/ProductDetail';
import { Cart } from './src/pages/Cart';
import { Footer } from './src/components/Footer';
import { ShopProvider } from './src/context/ShopContext';
import { CartDrawer } from './src/components/CartDrawer';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App: React.FC = () => {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-noir-950 text-noir-50 selection:bg-gold-500 selection:text-white font-sans">
          <Navbar />
          <CartDrawer />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
};

export default App;