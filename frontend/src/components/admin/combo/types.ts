export interface ImageType {
  url: string;
  public_id: string;
}

export interface ComboProductRef {
  product: string; // product _id
  variantId?: string | null; // variant _id, null agar base product

  // display-only fields (populated on edit / after selecting from dropdown)
  name?: string;
  title?: string;
  price?: number;
  images?: ImageType[];
  variantTitle?: string;

  quantity: number;
}

export interface ComboFormData {
  comboSku: string;

  title: string;
  description: string;

  discountedPrice: number;
  landingPrice: number;

  isActive: boolean;

  products: ComboProductRef[];
}