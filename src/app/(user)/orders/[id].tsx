import React from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import { IOrder, IOrderItem, OrderStatusList } from "@models/Order";
import OrderListItem from "@components/OrderListItem";
import OrderItemListItems from "@components/OrderItemListItems";
import Colors from "@constants/Colors";
import { useOrderDetails } from "@api/orders";

const OrderDetailsScreen = () => {
  const { id: orderId } = useLocalSearchParams();
  const id = parseFloat(typeof orderId === "string" ? orderId : orderId[0]);
  const { data: order, isLoading, error } = useOrderDetails(id);

  if (!order) return <Text>Order not found</Text>;

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch order details</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <OrderItemListItems item={item} />}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};

export default OrderDetailsScreen;
