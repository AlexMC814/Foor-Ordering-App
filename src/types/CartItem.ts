export interface IProduct {
  id: number;
  image: string | null;
  name: string;
  price: number;
}

export type PizzaSize = "S" | "M" | "L" | "XL";

export interface ICartItem {
  id: string;
  product: IProduct;
  product_id: number;
  size: PizzaSize;
  quantity: number;
}
