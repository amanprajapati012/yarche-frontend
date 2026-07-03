export interface OrderItem {
  product_id: string;

  product_name: string;

  category?: string;

  subcategory?: string;

  price: number;

  discountedPrice: number;

  itemTotalPrice: number;

  quantity: number;

  image: {
    url: string;
    public_id?: string;
  };
}

export interface OrderAddress {
  addressId: string;

  fullName: string;

  mobile: string;

  email?: string;

  addressLine: string;

  landmark?: string;

  district: string;

  city: string;

  state: string;

  country: string;

  pincode: string;
}

export interface Order {
  _id: string;

  fullName: string;

  mobile: string;

  user_id: string;

  items: OrderItem[];

  totalPrice: number;

  itemQuantity: number;

  shipping: number;

  couponCode?: string;

  couponDiscount?: number;

  paymentMode: "COD" | "ONLINE";

  paymentStatus:
    | "pending"
    | "paid"
    | "failed"
    | "success";

  razorpayOrderId?: string;

  address: OrderAddress;

  createdAt: string;

  updatedAt: string;
}

export interface OrderResponse {
  response: string;

  message: string;

  orders: Order[];
}