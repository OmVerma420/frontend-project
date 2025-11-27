// @ts-nocheck
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Truck, ShieldCheck, Heart, Share2, Ruler, ChevronDown } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, reviews, addReview } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });
  
  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) return <div className="pt-32 text-center text-white">Product not found.</div>;

  const isWishlisted = wishlist.includes(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if(newReview.user && newReview.comment) {
      addReview({
        productId: product.id,
        ...newReview
      });
      setNewReview({ user: "", rating: 5, comment: "" });
    }
  };

  return (
    <div className="bg-noir-950 min-h-screen pt-28 pb-12 bg-grain">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-white mb-8 text-xs uppercase tracking-widest flex items-center gap-2 group">
           <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Gallery - Sticky Scroll */}
          <div className="lg:col-span-7 space-y-4">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="relative aspect-[3/4] w-full overflow-hidden"
             >
                <img 
                    src={product.image} 
                    className="w-full h-full object-cover object-[center_25%]" 
                    alt={product.name}
                />
             </motion.div>
             <div className="grid grid-cols-2 gap-4">
                <img src={product.hoverImage} className="w-full aspect-[3/4] object-cover object-[center_25%]" alt="Detail 1" />
                <img src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80`} className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Detail 2" />
             </div>
          </div>

          {/* Details - Sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight">{product.name}</h1>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-full border transition-all duration-300 ${isWishlisted ? 'bg-gold-500 text-white border-gold-500' : 'border-white/10 text-gray-400 hover:border-white hover:text-white'}`}
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-serif text-gold-500">${product.price}</span>
                <div className="h-4 w-px bg-gray-700"></div>
                <div className="flex items-center text-gold-500 text-xs">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} size={12} fill="currentColor" className="mr-0.5" />
                   ))}
                   <span className="ml-2 text-gray-500">({productReviews.length} Reviews)</span>
                </div>
              </div>

              <p className="text-gray-400 font-light leading-relaxed mb-8 text-sm md:text-base">
                {product.description}
                <br/><br/>
                Expertly crafted for a luxurious feel and draped silhouette. This piece exemplifies the modern noir aesthetic, combining traditional tailoring with avant-garde sensibilities.
              </p>

              {/* Size Selector */}
              <div className="mb-10">
                <div className="flex justify-between mb-4">
                   <label className="text-xs uppercase tracking-widest text-gray-500">Select Size</label>
                   <button className="text-xs flex items-center gap-1 text-gray-500 hover:text-white transition-colors">
                     <Ruler size={12} /> Size Guide
                   </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm transition-all duration-300 border ${
                        selectedSize === size 
                          ? 'bg-white text-noir-950 border-white' 
                          : 'border-white/10 text-gray-400 hover:border-white/50 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-12">
                <button 
                  onClick={() => {
                    if(!selectedSize) return;
                    addToCart(product, selectedSize);
                  }}
                  disabled={!selectedSize}
                  className={`flex-1 py-4 uppercase tracking-[0.2em] font-bold text-xs transition-all duration-300 ${
                    selectedSize 
                      ? 'bg-gold-500 text-white hover:bg-white hover:text-noir-950 shadow-lg hover:shadow-xl' 
                      : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  {selectedSize ? 'Add to Bag' : 'Select Size'}
                </button>
                <button className="px-6 border border-white/10 text-gray-400 hover:text-white hover:border-white transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Tabs for Info/Reviews */}
              <div className="border-t border-white/10 pt-8">
                <div className="flex gap-8 border-b border-white/10 pb-4 mb-6">
                    <button 
                        onClick={() => setActiveTab('details')} 
                        className={`text-xs uppercase tracking-widest pb-4 -mb-4 transition-colors ${activeTab === 'details' ? 'text-gold-500 border-b border-gold-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        Details & Shipping
                    </button>
                    <button 
                        onClick={() => setActiveTab('reviews')} 
                        className={`text-xs uppercase tracking-widest pb-4 -mb-4 transition-colors ${activeTab === 'reviews' ? 'text-gold-500 border-b border-gold-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        Reviews
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'details' ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                            <div className="flex gap-4 items-start text-gray-400 text-sm">
                                <Truck size={18} className="mt-1 flex-shrink-0" />
                                <div>
                                    <span className="block text-white mb-1">Free Shipping & Returns</span>
                                    <span className="text-xs">Complimentary shipping on orders over $500. Returns accepted within 30 days.</span>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start text-gray-400 text-sm">
                                <ShieldCheck size={18} className="mt-1 flex-shrink-0" />
                                <div>
                                    <span className="block text-white mb-1">Authenticity Guaranteed</span>
                                    <span className="text-xs">Every item is verified by our expert team.</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                            <div className="space-y-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {productReviews.map(review => (
                                    <div key={review.id} className="border-b border-white/5 pb-4 last:border-0">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-white font-medium">{review.user}</span>
                                            <div className="flex text-gold-500">
                                                {[...Array(review.rating)].map((_,i) => <Star key={i} size={10} fill="currentColor" />)}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 leading-relaxed">{review.comment}</p>
                                        <span className="text-[10px] text-gray-600 mt-2 block">{review.date}</span>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Add Review Form */}
                            <form onSubmit={handleAddReview} className="pt-4 border-t border-white/10">
                                <h4 className="text-xs uppercase text-white mb-4">Write a Review</h4>
                                <div className="space-y-3">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        value={newReview.user}
                                        onChange={e => setNewReview({...newReview, user: e.target.value})}
                                        className="w-full bg-transparent border border-white/10 p-2 text-sm text-white placeholder:text-gray-600 focus:border-gold-500 outline-none"
                                    />
                                    <textarea 
                                        placeholder="Your Review" 
                                        value={newReview.comment}
                                        onChange={e => setNewReview({...newReview, comment: e.target.value})}
                                        className="w-full bg-transparent border border-white/10 p-2 text-sm text-white placeholder:text-gray-600 focus:border-gold-500 outline-none h-20 resize-none"
                                    />
                                    <button type="submit" className="bg-white text-noir-950 px-6 py-2 text-xs uppercase font-bold hover:bg-gold-500 hover:text-white transition-colors">
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};