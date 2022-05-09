import { View, Text, Button } from "react-native";
import { useCartStore } from "./Cart";
import { useNavigation } from "@react-navigation/native";

function CartSummary(props) {
  const { quantity, addProduct, cart, removeProduct } = useCartStore(
    (state) => ({
      cart: state.cart,
      // quantity: state.cart[id]?.quantity || 0,
      addProduct: state.addProduct,
      removeProduct: state.removeProduct,
    })
  );

  const cartArray = Object.keys(cart).map((key) => {
    return cart[key];
  });

  console.log("array", cartArray);

  const navigation = useNavigation();
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
              removeProduct({ id: cartProduct.id });
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
