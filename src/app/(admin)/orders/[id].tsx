import React from "react";
import { View, Text, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import { IOrder, IOrderItem } from "@/src/types/Order";
import OrderListItem from "@components/OrderListItem";
import OrderItemListItems from "@components/OrderItemListItems";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((o: IOrder) => o.id.toString() === id);

  if (!order) return <Text>Order not found</Text>;

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItems item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};

export default OrderDetailsScreen;
