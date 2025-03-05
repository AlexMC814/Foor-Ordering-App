import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";

const ProductListItem = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: products[0].image }} style={styles.image} />
      <Text style={styles.title}>{products[0].name}</Text>
      <Text style={styles.price}>${products[0].price}</Text>
    </View>
  );
};

export default function TabOneScreen() {
  return <ProductListItem />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    fontWeight: "700",
    marginVertical: 10,
    color: Colors.light.tint,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
