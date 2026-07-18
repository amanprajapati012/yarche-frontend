export interface ComboImage {
  url: string;
  public_id: string;
}

export interface ComboProduct {
  product:
    | string
    | {
        _id: string;
        productSku: string;
        name: string;
        title: string;
        price: number;
        discountedPrice: number;
        landingPrice: number;
        quantity: number;
        images: {
          url: string;
          public_id: string;
        }[];
      };

  quantity: number;
}

export interface Combo {
  _id: string;

  comboSku: string;

  title: string;

  description: string;

  image: ComboImage;

  products: ComboProduct[];

  price: number;

  discountedPrice: number;

  landingPrice: number;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface ComboPayload {
  comboSku: string;

  title: string;

  description: string;

  products: {
    product: string;
    quantity: number;
  }[];

  discountedPrice: number;

  landingPrice: number;

  image?: File | null;
}