import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ICartItem, IProduct } from "@/src/types/CartItem";
import { randomUUID } from "expo-crypto";

export interface ICartProvider {
  items: ICartItem[];
  total: number;
  addItem: (product: IProduct, size: ICartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
}

const CartContext = createContext<ICartProvider>({
  items: [],
  total: 0,
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<ICartItem[]>([]);

  const addItem = (product: IProduct, size: ICartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: ICartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems: ICartItem[] = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext) as ICartProvider;
