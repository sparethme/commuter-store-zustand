import { View, Text, Button } from "react-native";
import { useCartStore } from "./Cart";

function CartSummary(props) {
  const { quantity, addProduct, cart } = useCartStore((state) => ({
    cart: state.cart,
    // quantity: state.cart[id]?.quantity || 0,
    addProduct: state.addProduct,
  }));

  const cartArray = Object.keys(cart).map((key) => {
    return cart[key];
  });

  console.log("array", cartArray);
  return (
    <View>
      {cartArray.map((cartProduct) => (
        <View
          key={cartProduct.id}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{cartProduct.name}</Text>
          <Button
            onPress={() => {
              console.log("todo: decrease product quantity");
            }}
            title="-"
          />
          <Text>{cartProduct.quantity}</Text>
          <Button
            onPress={() => {
              addProduct({ id: cartProduct.id, name: cartProduct.name });
            }}
            title="+"
          />
        </View>
      ))}
      <Button
        title="Go to Checkout"
        onPress={() => navigation.navigate("Checkout")}
      />
    </View>
  );
}

export default CartSummary;
