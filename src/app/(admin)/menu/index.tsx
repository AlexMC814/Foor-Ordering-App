import { Text, FlatList, ActivityIndicator } from "react-native";
import ProductListItem from "@/src/components/ProductListItem";
import { useProductList } from "@api/products";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  if (!isLoading && !products?.length) {
    return <Text>No products found</Text>;
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
