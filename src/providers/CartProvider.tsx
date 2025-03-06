import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ICartItem, IProduct } from "@/src/types/CartItem";
import { randomUUID } from "expo-crypto";

export interface ICartProvider {
  items: ICartItem[];
  addItem: (product: IProduct, size: ICartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
}

const CartContext = createContext<ICartProvider>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<ICartItem[]>([]);

  const addItem = (product: IProduct, size: ICartItem["size"]) => {
    // TODO: if already in cart increment quantity
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if(existingItem) {
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

  //   TODO: Update quantity
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

  return (
    <CartContext.Provider
      value={{
        items,
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
