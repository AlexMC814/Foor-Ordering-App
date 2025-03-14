import { Tables } from "./tables";

export type Product = Tables<'products'>

export type PizzaSize = "S" | "M" | "L" | "XL";

export interface ICartItem {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
}
