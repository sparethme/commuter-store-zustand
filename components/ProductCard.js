// import react from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useCartStore } from "./Cart";

export function ProductCard({ product }) {
  const { id, name, price, image } = product ? product : null;
  const { cart, addProduct, quantity } = useCartStore((state) => ({
    cart: state.cart,
    addProduct: state.addProduct,
    // TODO: deconstruct quantity=
    // if undefined quanitty than pass 0
    quantity: state.cart[id]?.quantity || 0,
  }));

  // console.log("cart", cart);
  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity
        onPress={() => {
          addProduct({ id: id, name: name });
        }}
        style={{
          borderColor: "red",
          borderWidth: 2,
          margin: 3,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text>{name}</Text>
        <Text>{image}</Text>
        <Text>{price}</Text>
        <Text>{quantity}</Text>
      </TouchableOpacity>
    </View>
  );
}
