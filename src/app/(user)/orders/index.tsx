import { ActivityIndicator, FlatList, Text } from "react-native";
import OrderListItem from "@components/OrderListItem";
import { useMyOrderList } from "@api/orders";

export default function MenuScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  if(isLoading) {
    return <ActivityIndicator />;
  }

  if(error) {
    return <Text>Failet to fetch your orders</Text>;
  }

  return (
    <FlatList
      data={orders}
      numColumns={1}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
