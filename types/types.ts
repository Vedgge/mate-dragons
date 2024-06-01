export interface Product {
  id: number;
  name: string;
  brand: string;
  type: string;
  weight: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

