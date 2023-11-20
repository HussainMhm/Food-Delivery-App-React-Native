import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Restaurant from "./screens/Restaurant";
import Cart from "./screens/Cart";
import OrderPreparing from "./screens/OrderPreparing";
import Delivery from "./screens/Delivery";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Restaurant" component={Restaurant} />
                <Stack.Screen name="Cart" component={Cart} options={{ presentation: "modal" }} />
                <Stack.Screen
                    name="OrderPreparing"
                    component={OrderPreparing}
                    options={{ presentation: "fullScreenModal" }}
                />
                <Stack.Screen
                    name="Delivery"
                    component={Delivery}
                    options={{ presentation: "fullScreenModal" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
