export interface Variant {
  _id?: string;

  title: string;

  price: number;
  discountedPrice: number;
  landingPrice: number;

  quantity: number;

  description: string;

  images?: string[];

  useProductImages?: boolean;
}

export interface ProductFormData {
  productSku: string;

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

  variants: Variant[];
}