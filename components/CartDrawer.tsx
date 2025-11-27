// @ts-nocheck
import React from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cartOpen, setCartOpen, cart, updateQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-noir-900 z-[70] shadow-2xl flex flex-col border-l border-noir-800"
          >
             <div className="p-6 border-b border-noir-800 flex justify-between items-center">
               <h2 className="font-serif text-2xl text-white flex items-center gap-2">
                 Bag <span className="text-gold-500 text-sm font-sans">({cart.length})</span>
               </h2>
               <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-white">
                 <X size={24} />
               </button>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                    <ShoppingBag size={48} className="opacity-20" />
                    <p>Your bag is empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                       <img src={item.image} alt={item.name} className="w-20 h-24 object-cover object-top bg-noir-800" />
                       <div className="flex-1">
                          <div className="flex justify-between mb-1">
                             <h4 className="text-white text-sm font-medium uppercase">{item.name}</h4>
                             <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-gray-600 hover:text-white">
                               <X size={14} />
                             </button>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{item.selectedSize}</p>
                          <div className="flex justify-between items-center mt-2">
                             <div className="flex items-center border border-noir-800">
                                <button onClick={() => updateQuantity(item.id, item.selectedSize, -1)} className="p-1 text-gray-400 hover:text-white"><Minus size={12} /></button>
                                <span className="px-2 text-xs text-white">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.selectedSize, 1)} className="p-1 text-gray-400 hover:text-white"><Plus size={12} /></button>
                             </div>
                             <span className="text-gold-500 font-serif">${item.price * item.quantity}</span>
                          </div>
                       </div>
                    </div>
                  ))
                )}
             </div>

             <div className="p-6 border-t border-noir-800 bg-noir-950">
                <div className="flex justify-between items-center mb-4">
                   <span className="text-gray-400 uppercase tracking-widest text-xs">Subtotal</span>
                   <span className="text-xl font-serif text-white">${subtotal}</span>
                </div>
                <button 
                  onClick={() => {
                    setCartOpen(false);
                    navigate('/cart');
                  }}
                  disabled={cart.length === 0}
                  className="w-full bg-white text-noir-950 py-3 uppercase tracking-widest font-bold text-xs hover:bg-gold-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  View Cart & Checkout
                </button>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};