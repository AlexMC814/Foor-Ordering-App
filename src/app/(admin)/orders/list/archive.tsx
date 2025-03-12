import { FlatList } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";

export default function MenuScreen() {
  return (
    <FlatList
      data={orders}
      numColumns={1}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
