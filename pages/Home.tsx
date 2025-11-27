
// @ts-nocheck
import React from 'react';
import { Hero } from '../components/Hero';
import { motion } from 'framer-motion';
import { PRODUCTS, FALLBACK_IMAGE } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

// Reliable Unsplash IDs for fashion editorial images
const SCROLL_IMAGES = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
  'https://img.sanishtech.com/u/6943398e7db60854fbfa96d19dc22b7d.jpg',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
  'https://img.sanishtech.com/u/67b56578279d50238fb2c4130f712367.jpg'
];

export const Home: React.FC = () => {
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <div className="bg-noir-950 min-h-screen bg-grain">
      <Hero />

      {/* Infinite Text Marquee Strip */}
      <div className="py-20 border-y border-white/5 overflow-hidden relative bg-noir-900">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-6xl md:text-8xl font-serif font-bold text-stroke uppercase tracking-tighter cursor-default">
              New Collection 2025 — Noir Édition — 
            </span>
          ))}
        </div>
      </div>

      {/* Infinite Image Scroll (Marquee) Section */}
      <section className="py-32 relative overflow-hidden bg-noir-950">
        <div className="px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6 max-w-7xl mx-auto">
          <div>
            <h3 className="text-gold-500 tracking-[0.2em] uppercase text-xs mb-4 font-bold">Editorial Campaign</h3>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-none">Urban<br/>Deconstruction</h2>
          </div>
          <Link to="/shop" className="group text-white border-b border-white pb-1 hover:text-gold-500 hover:border-gold-500 transition-all text-sm uppercase tracking-widest flex items-center gap-2">
            View Collection 
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        {/* Auto Scrolling Marquee */}
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-6 pl-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            style={{ width: "max-content" }}
          >
             {/* Duplicate array for seamless loop */}
             {[...SCROLL_IMAGES, ...SCROLL_IMAGES, ...SCROLL_IMAGES].map((img, idx) => (
               <Link to="/shop" key={idx} className="relative block w-[280px] h-[400px] md:w-[400px] md:h-[550px] flex-shrink-0 group overflow-hidden cursor-pointer">
                 <img 
                   src={img}
                   className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                   alt={`Editorial Look ${idx}`}
                   onError={(e) => {
                       (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                   }}
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                 <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-black/60 backdrop-blur px-4 py-2">
                    <p className="text-white font-serif text-xl italic">Explore Look</p>
                 </div>
               </Link>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Product Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
         <div className="flex flex-col items-center text-center mb-16">
          <span className="h-px w-20 bg-gold-500 mb-6"></span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Essential Pieces</h2>
          <p className="max-w-xl text-gray-400 font-light leading-relaxed">
            Curated garments designed for the modern silhouette. Timeless, sustainable, and crafted with precision for the discerning individual.
          </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {PRODUCTS.slice(0, 4).map((product, i) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                key={product.id}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
         </div>
         
         <div className="mt-20 text-center">
            <Link to="/shop" className="inline-block border border-white/20 px-12 py-4 uppercase tracking-widest font-bold text-xs hover:bg-white hover:text-black transition-all duration-300">
              Shop The Collection
            </Link>
         </div>
      </section>

      {/* Cinematic Video Break */}
      <section className="h-[80vh] relative overflow-hidden flex items-center justify-center group">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-black/30 transition-colors duration-700"></div>
          <img 
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80" 
            className="w-full h-full object-cover" 
            alt="Atmosphere" 
          />
        </div>
        <div className="relative z-10 text-center px-6">
           <h2 className="text-6xl md:text-9xl font-serif text-white mb-8 italic mix-blend-overlay">The Campaign</h2>
           <motion.button 
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="mt-8 border border-white/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto hover:bg-white/10 backdrop-blur-md transition-all group cursor-pointer"
  onClick={() => setShowVideo(true)}
>
  <Play className="fill-white ml-2 text-white" size={32} />
</motion.button>

        </div>
      </section>

      {/* Editorial Vertical Scroll + Sticky Info */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
           <div className="md:col-span-4 md:sticky md:top-32 h-fit space-y-8 z-20">
              <h2 className="text-5xl font-serif text-white leading-[1.1]">
                Designed in <br/> <span className="text-gray-600 italic">Milan, Italy</span>
              </h2>
              <div className="w-12 h-1 bg-gold-500"></div>
              <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                Our latest collection explores the dichotomy between structure and fluidity. We source materials from heritage mills, ensuring every thread tells a story of quality and endurance.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                 <div>
                    <h4 className="text-4xl font-serif text-white mb-2">100%</h4>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">Sustainable Materials</p>
                 </div>
                 <div>
                    <h4 className="text-4xl font-serif text-white mb-2">Ltd.</h4>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">Limited Edition Drops</p>
                 </div>
              </div>
           </div>
           
           <div className="md:col-span-8 flex flex-col gap-8 md:pl-12">
              <Link to="/shop?category=Tailoring" className="block relative h-[600px] overflow-hidden group cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105" alt="Look 1" />
                 <div className="absolute bottom-0 left-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white text-xs uppercase tracking-widest bg-black/50 backdrop-blur px-3 py-1">Tailoring</span>
                 </div>
              </Link>
              <div className="grid grid-cols-2 gap-8">
                 <Link to="/shop" className="h-[400px] overflow-hidden group relative cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Look 2" />
                 </Link>
                 <Link to="/shop" className="h-[400px] overflow-hidden group relative mt-16 cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Look 3" />
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Shop The Look Interactivity */}
      <section className="py-24 bg-noir-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-12 flex justify-between items-end">
             <h2 className="text-3xl font-serif text-white">Shop The Look</h2>
             <span className="text-gray-500 text-sm">Hover to discover</span>
           </div>
           
           <div className="relative aspect-video max-h-[700px] w-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover object-top opacity-80" alt="Shop The Look" />
              
              {/* Hotspot 1 */}
              <motion.div 
                className="absolute top-[30%] left-[45%] group"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
              >
                 <Link to="/shop?category=Tops">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer animate-pulse">
                        <div className="w-3 h-3 bg-noir-950 rounded-full"></div>
                    </div>
                 </Link>
                 <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 bg-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto shadow-2xl z-20">
                    <h4 className="text-noir-950 font-bold text-xs uppercase mb-1">Silk Blouse</h4>
                    <p className="text-gray-500 text-xs mb-2">$240.00</p>
                    <Link to="/product/5" className="text-[10px] underline uppercase tracking-widest text-noir-950 block hover:text-gold-500">View Product</Link>
                 </div>
              </motion.div>

               {/* Hotspot 2 */}
              <motion.div 
                className="absolute top-[60%] left-[55%] group"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                 <Link to="/shop?category=Bottoms">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer animate-pulse">
                        <div className="w-3 h-3 bg-noir-950 rounded-full"></div>
                    </div>
                 </Link>
                 <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 bg-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto shadow-2xl z-20">
                    <h4 className="text-noir-950 font-bold text-xs uppercase mb-1">Pleated Trousers</h4>
                    <p className="text-gray-500 text-xs mb-2">$340.00</p>
                    <Link to="/product/6" className="text-[10px] underline uppercase tracking-widest text-noir-950 block hover:text-gold-500">View Product</Link>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>
      {showVideo && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
    <div className="relative w-full max-w-4xl aspect-video">
      <iframe
        className="w-full h-full rounded-xl"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        title="Campaign Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      {/* Close Button */}
      <button
        onClick={() => setShowVideo(false)}
        className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-xl hover:bg-gray-200 transition"
      >
        ✕
      </button>
    </div>
  </div>
)}

    </div>
  );
};
