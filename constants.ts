
import { Product, Review } from './types';

// Fallback image in case of load error
export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1550614000-4b9519879656?auto=format&fit=crop&w=800&q=80";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Obsidian Trench Coat",
    price: 890,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
    description: "A structured, floor-length trench coat crafted from Italian wool blend. Features a double-breasted closure and exaggerated lapels.",
    sizes: ["XS", "S", "M", "L", "XL"],
    gender: "Women"
  },
  {
    id: 2,
    name: "Void Silk Slip Dress",
    price: 450,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=800&q=80",
    description: "Fluid silk satin slip dress in midnight black. Bias cut for a draping silhouette that follows the body's natural lines.",
    sizes: ["XS", "S", "M", "L"],
    gender: "Women"
  },
  {
    id: 3,
    name: "Architectural Blazer",
    price: 620,
    category: "Tailoring",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    description: "Sharp shoulders and a cinched waist define this modern blazer. Finished with matte black hardware.",
    sizes: ["S", "M", "L", "XL"],
    gender: "Women"
  },
  {
    id: 4,
    name: "Nomad Leather Boots",
    price: 780,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
    description: "Calfskin leather boots with a chunky sole and utilitarian silhouette. Hand-finished for a unique patina.",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    gender: "Unisex"
  },
  {
    id: 5,
    name: "Vapor Sheer Top",
    price: 220,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80",
    description: "Semi-sheer mesh top with elongated sleeves and raw hems. Perfect for layering under structured pieces.",
    sizes: ["XS", "S", "M", "L"],
    gender: "Women"
  },
  {
    id: 6,
    name: "Carbon Wide Trousers",
    price: 340,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1617137968427-85924c809a81?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
    description: "High-waisted pleated trousers in a heavy cotton twill. The wide leg creates a powerful, fluid movement.",
    sizes: ["28", "30", "32", "34"],
    gender: "Men"
  },
  {
    id: 7,
    name: "Eclipse Knit Sweater",
    price: 395,
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=800&q=80",
    description: "Oversized chunky knit sweater made from organic merino wool. Features dropped shoulders and a mock neck.",
    sizes: ["S", "M", "L"],
    gender: "Men"
  },
  {
    id: 8,
    name: "Lunar Crossbody Bag",
    price: 550,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    description: "Minimalist leather crossbody bag with geometric detailing and silver foil stamp.",
    sizes: ["One Size"],
    gender: "Unisex"
  },
  {
    id: 9,
    name: "Oxford Cotton Shirt",
    price: 210,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
    description: "Classic white oxford shirt with a modern relaxed fit. Mother of pearl buttons.",
    sizes: ["S", "M", "L", "XL"],
    gender: "Men"
  },
  {
    id: 10,
    name: "Technical Cargo Pant",
    price: 420,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?auto=format&fit=crop&w=800&q=80",
    description: "Nylon blend cargo pants with multiple functional pockets and adjustable ankle toggles.",
    sizes: ["30", "32", "34", "36"],
    gender: "Men"
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    user: "Sarah M.",
    rating: 5,
    comment: "The quality is absolutely stunning. Fits perfectly and feels very high-end.",
    date: "2024-02-15"
  },
  {
    id: 2,
    productId: 1,
    user: "James K.",
    rating: 4,
    comment: "Great coat, but the sleeves are slightly longer than expected.",
    date: "2024-01-20"
  },
  {
    id: 3,
    productId: 2,
    user: "Elena R.",
    rating: 5,
    comment: "The most beautiful dress I own. The silk is incredibly soft.",
    date: "2024-03-01"
  }
];
