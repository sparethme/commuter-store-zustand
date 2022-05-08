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

const client = new ApolloClient({
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
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>Commuter Essentials Store</Text>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <Button
        title="Go to Checkout"
        onPress={() => navigation.navigate("Checkout")}
      />
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
