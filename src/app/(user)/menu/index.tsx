import { FlatList } from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({ item }) => <ProductListItem product={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
