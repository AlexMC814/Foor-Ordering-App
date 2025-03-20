import { Image, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Link, useSegments } from "expo-router";
import { Tables } from "@models/db.types";
import RemoteImage from "./RemoteImage";

export interface ProductListItemProps {
  product: Tables<"products">;
}

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.image}
          resizeMode="contain"
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
