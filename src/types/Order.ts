import { IProduct, PizzaSize } from "./CartItem";

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

export interface IOrderItem {
  id: number;
  product_id: number;
  products: IProduct;
  order_id: number;
  size: PizzaSize;
  quantity: number;
}

export interface IOrder {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: IOrderItem[];
}
