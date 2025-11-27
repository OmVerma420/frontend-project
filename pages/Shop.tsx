
// @ts-nocheck
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Filter, ChevronDown, Grid, List, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const CATEGORIES = ["All", "Outerwear", "Dresses", "Tailoring", "Footwear", "Tops", "Bottoms", "Knitwear", "Accessories"];

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery } = useShop();
  const [sortBy, setSortBy] = useState("featured");

  // Derive state directly from URL search params
  const selectedGender = searchParams.get('gender') || "All";
  const selectedCategory = searchParams.get('category') || "All";

  // Filter products based on URL params
  const filteredProducts = useMemo(() => {
    let items = [...PRODUCTS];
    
    // Filter by Gender
    if (selectedGender !== "All") {
        items = items.filter(p => p.gender === selectedGender || p.gender === 'Unisex');
    }

    // Filter by Category
    if (selectedCategory !== "All") {
      items = items.filter(p => p.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery) {
        items = items.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sort
    if (sortBy === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    }
    return items;
  }, [selectedCategory, selectedGender, sortBy, searchQuery]);

  // Update URL to reflect filter changes
  const updateFilter = (type: 'gender' | 'category', value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All') {
      newParams.delete(type);
    } else {
      newParams.set(type, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="bg-noir-950 min-h-screen pt-32 pb-12 bg-grain">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-2">Collection</h1>
            <div className="flex gap-2 text-sm tracking-widest uppercase text-gray-400">
                {selectedGender !== 'All' && <span className="text-gold-500">{selectedGender}</span>}
                {selectedGender !== 'All' && selectedCategory !== 'All' && <span>/</span>}
                {selectedCategory !== 'All' && <span className="text-gold-500">{selectedCategory}</span>}
                {selectedGender === 'All' && selectedCategory === 'All' && <span>Ready-to-wear SS25</span>}
            </div>
          </div>
          <div className="text-right text-gray-500 text-xs uppercase tracking-widest">
            {filteredProducts.length} Items Found
          </div>
        </motion.div>

        {/* Filter Bar - Adjusted sticky top to match Navbar height (Mobile: 60px, Desktop: 70px) to ensure overlap */}
        <div className="sticky top-[60px] md:top-[70px] z-40 bg-noir-950 py-4 mb-8 border-y border-white/10 shadow-xl transition-all duration-300">
          <div className="flex flex-col gap-4">
            
            {/* Gender Switcher */}
            <div className="flex justify-center md:justify-start gap-8 border-b border-white/5 pb-2 md:border-none md:pb-0">
               {['All', 'Women', 'Men'].map(g => (
                   <button
                     key={g}
                     onClick={() => updateFilter('gender', g)}
                     className={`text-xs uppercase font-bold tracking-widest transition-colors ${selectedGender === g ? 'text-white border-b border-gold-500 pb-1' : 'text-gray-600 hover:text-gray-400'}`}
                   >
                     {g}
                   </button>
               ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="w-full md:w-auto overflow-x-auto hide-scrollbar">
                    <div className="flex gap-6 pb-2 md:pb-0">
                        {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => updateFilter('category', cat)}
                            className={`text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 ${
                            selectedCategory === cat ? 'text-gold-500' : 'text-gray-500 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                <div className="relative group">
                    <button className="flex items-center gap-2 text-xs text-white uppercase tracking-widest hover:text-gold-500 transition-colors">
                        Sort By <ChevronDown size={14} />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-noir-900 border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 p-2">
                        <button onClick={() => setSortBy('featured')} className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-wide hover:bg-white/5 transition-colors ${sortBy === 'featured' ? 'text-gold-500' : 'text-gray-400'}`}>Featured</button>
                        <button onClick={() => setSortBy('price-asc')} className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-wide hover:bg-white/5 transition-colors ${sortBy === 'price-asc' ? 'text-gold-500' : 'text-gray-400'}`}>Price: Low to High</button>
                        <button onClick={() => setSortBy('price-desc')} className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-wide hover:bg-white/5 transition-colors ${sortBy === 'price-desc' ? 'text-gold-500' : 'text-gray-400'}`}>Price: High to Low</button>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
                <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                >
                <ProductCard product={product} />
                </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
           <div className="py-32 text-center text-gray-500 flex flex-col items-center">
             <Filter size={48} className="mb-4 opacity-20" />
             <p className="text-xl font-serif mb-2">No products found</p>
             <p className="text-sm">Try adjusting your filters or search terms.</p>
             <button onClick={clearFilters} className="mt-4 text-xs underline uppercase tracking-widest text-gold-500">Clear Filters</button>
           </div>
        )}
      </div>
    </div>
  );
};
