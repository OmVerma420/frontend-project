
// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { FALLBACK_IMAGE } from '../constants';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useShop();

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden relative aspect-[3/4] bg-noir-800">
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="w-full h-full"
        >
            <img 
              src={product.image} 
              alt={product.name}
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
              className={`absolute inset-0 w-full h-full object-cover object-[center_25%] transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />
            <img 
              src={product.hoverImage} 
              alt={product.name}
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
              className={`absolute inset-0 w-full h-full object-cover object-[center_25%] transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
        </motion.div>
        
        {/* Quick Actions Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center gap-4 z-10"
            >
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product, product.sizes[0]);
                }}
                className="bg-white text-noir-950 p-4 rounded-full hover:bg-gold-500 hover:text-white transition-colors shadow-xl"
                title="Quick Add (Size S)"
              >
                <Plus size={20} />
              </motion.button>
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                    e.preventDefault();
                    // Navigate handled by link wrapper, just visual
                }}
                className="bg-noir-950 text-white p-4 rounded-full hover:bg-gold-500 transition-colors shadow-xl"
              >
                <Eye size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Badge example */}
        {product.price > 600 && (
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-noir-950 text-[10px] uppercase font-bold px-2 py-1 tracking-widest">
                Exclusive
            </div>
        )}
      </Link>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-white tracking-wide uppercase group-hover:text-gold-500 transition-colors duration-300">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        </div>
        <span className="text-sm font-serif italic text-gold-500">${product.price}</span>
      </div>
    </div>
  );
};
