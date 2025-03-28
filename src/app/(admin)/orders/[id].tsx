import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { OrderStatusList } from "@models/Order";
import OrderListItem from "@components/OrderListItem";
import OrderItemListItems from "@components/OrderItemListItems";
import Colors from "@constants/Colors";
import { useOrderDetails, useUpdateOrder } from "@api/orders";
import { notifyUserAboutOrderUpdate } from "@lib/notifications";

const OrderDetailsScreen = () => {
  const { id: orderId } = useLocalSearchParams();
  const id = parseFloat(typeof orderId === "string" ? orderId : orderId[0]);
  const { data: order, isLoading, error } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder();

  if (!order) return <Text>Order not found</Text>;

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch order details</Text>;
  }

  const updateStatus = async (status: string) => {
    updateOrder({ id, updatedFields: { status } });
    await notifyUserAboutOrderUpdate({ ...order, status });
  };

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItems item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
};

export default OrderDetailsScreen;
