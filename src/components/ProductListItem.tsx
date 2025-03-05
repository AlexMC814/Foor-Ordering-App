import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Link } from "expo-router";

export interface IProduct {
  id: number;
  name: string;
  image: string | null;
  price: number;
}

export interface ProductListItemProps {
  product: IProduct;
}

export const defaultPizzaIMage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Link href={`./menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: product.image || defaultPizzaIMage }}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
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
    margin: "auto",
  },
});

export default ProductListItem;
