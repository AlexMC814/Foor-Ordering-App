import { Tables } from "./tables";


export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";
export type Order = Tables<"orders">;
export type OrderItem = Tables<'order_items'>;
