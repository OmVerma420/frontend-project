import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-noir-950 text-white pt-24 pb-12 border-t border-white/5 bg-grain">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          <div className="md:col-span-1">
            <h3 className="font-serif text-3xl mb-8 tracking-tighter">NOIR ÉDITION</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-8 max-w-xs">
              Redefining contemporary luxury through minimalism, structure, and fluid form. Designed in Milan, worn globally.
            </p>
            <div className="flex gap-6">
              <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold mb-8 text-gray-500">Collection</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><a href="#" className="hover:text-gold-500 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Ready to Wear</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Editorial</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold mb-8 text-gray-500">Maison</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><a href="#" className="hover:text-gold-500 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold mb-8 text-gray-500">Newsletter</h4>
            <p className="text-xs text-gray-400 mb-4">Subscribe for exclusive access.</p>
            <div className="flex border-b border-white/20 pb-2">
                <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-600" />
                <button className="text-white hover:text-gold-500 transition-colors">
                    <ArrowRight size={16} />
                </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-gray-600 uppercase tracking-widest">
          <p>© 2025 NOIR ÉDITION. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
};