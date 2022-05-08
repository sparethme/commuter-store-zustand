import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { ProductCard } from "./components/ProductCard";
import CartSummary from "./components/CartSummary";

const client = new ApolloClient({
  // ideally env variables here but for sake of testing
  uri: "https://charmed-squirrel-78.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": "adminsecret",
  },
});

const PRODUCTS = gql`
  query GetStoreProducts {
    product {
      id
      name
      price
      image
    }
  }
`;

const Stack = createNativeStackNavigator();

function StoreScreen({ navigation }) {
  const { loading, error, data } = useQuery(PRODUCTS);
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  const products = data ? data.product : [];

  console.log("products", products);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        borderColor: "green",
        borderWidth: 1,
      }}
    >
      <Text>Commuter Essentials Store</Text>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 3,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "red",
            borderWidth: 1,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "blue",
            borderWidth: 1,
          }}
        >
          <CartSummary />
        </View>
      </View>
    </View>
  );
}

function CheckoutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Checkout Screen</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("Store")} />
    </View>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Store" component={StoreScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
