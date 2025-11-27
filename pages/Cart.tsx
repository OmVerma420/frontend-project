// @ts-nocheck
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Minus, Plus, Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useShop();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
        setIsCheckingOut(false);
        setOrderComplete(true);
        clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
        <div className="min-h-screen bg-noir-950 flex items-center justify-center text-center p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-noir-900 border border-white/10 p-12"
            >
                <div className="flex justify-center mb-6 text-gold-500">
                    <CheckCircle size={64} />
                </div>
                <h2 className="text-3xl font-serif text-white mb-4">Order Confirmed</h2>
                <p className="text-gray-400 mb-8">Thank you for your purchase. A confirmation email has been sent to you.</p>
                <Link to="/shop" className="inline-block w-full bg-white text-noir-950 py-3 uppercase tracking-widest font-bold text-xs hover:bg-gold-500 hover:text-white transition-colors">
                    Continue Shopping
                </Link>
            </motion.div>
        </div>
    );
  }

  return (
    <div className="bg-noir-950 min-h-screen pt-32 pb-12 bg-grain">
       <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-12">Shopping Bag <span className="text-lg text-gray-500 font-sans">({cart.length})</span></h1>

          {cart.length === 0 ? (
            <div className="text-center py-24 border-t border-b border-white/10">
               <p className="text-gray-400 mb-8 text-lg">Your shopping bag is currently empty.</p>
               <Link to="/shop" className="inline-block bg-white text-noir-950 px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold-500 hover:text-white transition-colors shadow-lg">
                 Discover Collection
               </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
               {/* Cart Items */}
               <div className="lg:col-span-2 space-y-8">
                  <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div 
                        key={`${item.id}-${item.selectedSize}`} 
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex gap-6 pb-8 border-b border-white/5"
                    >
                      <Link to={`/product/${item.id}`} className="w-32 h-40 flex-shrink-0 bg-noir-900 overflow-hidden">
                         <img src={item.image} alt={item.name} className="w-full h-full object-cover object-[center_25%]" />
                      </Link>
                      <div className="flex-1 flex flex-col justify-between">
                         <div>
                           <div className="flex justify-between items-start mb-2">
                              <h3 className="text-white font-medium uppercase tracking-wide text-sm">{item.name}</h3>
                              <span className="text-white font-serif">${item.price * item.quantity}</span>
                           </div>
                           <p className="text-gray-500 text-xs mb-1">{item.category}</p>
                           <p className="text-gray-500 text-xs">Size: <span className="text-white">{item.selectedSize}</span></p>
                         </div>
                         
                         <div className="flex justify-between items-center">
                            <div className="flex items-center border border-white/10">
                               <button 
                                 onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                                 className="p-2 text-gray-400 hover:text-white transition-colors"
                               >
                                 <Minus size={14} />
                               </button>
                               <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                               <button 
                                 onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                                 className="p-2 text-gray-400 hover:text-white transition-colors"
                               >
                                 <Plus size={14} />
                               </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id, item.selectedSize)}
                              className="text-gray-500 hover:text-red-500 text-xs uppercase tracking-wider transition-colors"
                            >
                              Remove
                            </button>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                  </AnimatePresence>
               </div>

               {/* Summary */}
               <div className="lg:col-span-1">
                  <div className="bg-noir-900/50 backdrop-blur-sm p-8 sticky top-32 border border-white/5">
                     <h3 className="text-xl font-serif text-white mb-8">Order Summary</h3>
                     
                     <div className="space-y-4 text-sm text-gray-400 mb-8">
                        <div className="flex justify-between">
                           <span>Subtotal</span>
                           <span className="text-white">${subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Shipping</span>
                           <span className="text-white">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Tax (Est.)</span>
                           <span className="text-white">$0.00</span>
                        </div>
                     </div>

                     <div className="border-t border-white/10 pt-6 mb-8">
                        <div className="flex justify-between items-end">
                           <span className="text-sm font-bold text-white uppercase tracking-widest">Total</span>
                           <span className="text-3xl font-serif text-gold-500">${total}</span>
                        </div>
                     </div>

                     <button 
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-white text-noir-950 py-4 uppercase tracking-widest font-bold text-xs hover:bg-gold-500 hover:text-white transition-all flex justify-center items-center gap-2 group disabled:opacity-50"
                     >
                        {isCheckingOut ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                        )}
                     </button>

                     <div className="mt-6 flex justify-center gap-4 text-gray-600">
                        {/* Fake Payment Icons */}
                        <div className="w-8 h-5 bg-white/10 rounded"></div>
                        <div className="w-8 h-5 bg-white/10 rounded"></div>
                        <div className="w-8 h-5 bg-white/10 rounded"></div>
                     </div>
                  </div>
               </div>
            </div>
          )}
       </div>
    </div>
  );
};