export interface ImageType {
  url: string;
  public_id: string;
}

export interface ProductVariant {
  _id: string;
  title: string;

  price: number;
  discountedPrice: number;
  landingPrice: number;

  quantity: number;
}

export interface ProductItem {
  _id: string;

  name: string;
  title: string;

  variants: ProductVariant[];
}

export interface ComboProduct {
  product: string;

  variantId: string | null;

  quantity: number;
}

export interface ComboFormData {
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

  productType: "combo";

  comboProducts: ComboProduct[];

  tags: string[];
}