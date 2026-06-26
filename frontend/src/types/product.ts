export interface Product {
  _id?: string;
  name: string;
  title: string;
  description: string;
  full_description: string;
  category: string;
  sub_category: string;
  price: number;
  discountedPrice: number;
  landingPrice: number;
  quantity: number;
  sizes: string[];
  images: string[];
}