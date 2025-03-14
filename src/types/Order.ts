import { Product, PizzaSize } from "./CartItem";
import { Tables } from "./tables";

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

export type OrderItem = Tables<'order_items'>;

export type Order = Tables<"orders">;
