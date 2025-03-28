import { ActivityIndicator, FlatList, Text } from "react-native";
import ProductListItem from "@components/ProductListItem";
import { useProductList } from "@/src/api/products";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

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
