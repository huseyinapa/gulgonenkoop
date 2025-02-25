export type CartProduct = {
  id: string;
  pid: string;
  amount: number;
  date: string;
};

export interface CartItem {
  id: string;
  pid?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  amount?: number;
  stockStatus?: boolean;
}
