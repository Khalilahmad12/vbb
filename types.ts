
export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating: number;
  features: string[];
  imageUrl: string;
  isSale?: boolean;
  isFeatured?: boolean;
  link: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
