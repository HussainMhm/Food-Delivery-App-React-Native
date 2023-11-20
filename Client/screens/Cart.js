import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import * as Icon from "react-native-feather";

import { themeColors } from "../theme";
import { featured } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { removeFromCart, selectCartItems, selectCartTotal } from "../slices/cartSlice";

function Cart(props) {
    const deliveryFee = 2;
    const navigation = useNavigation();

    const restaurant = useSelector(selectRestaurant);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    const [groupedItems, setGroupedItems] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const items = cartItems.reduce((group, item) => {
            if (group[item.id]) {
                group[item.id].push(item);
            } else {
                group[item.id] = [item];
            }
            return group;
        }, {});
        setGroupedItems(items);
    }, [cartItems]);

    return (
        <View className="bg-white flex-1">
            {/* Back Button */}
            <View className="relative py-4 shadow-sm">
                <TouchableOpacity
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    className="absolute z-10 rounded-full shadow top-5 left-2 p-2"
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ArrowLeft stroke="white" strokeWidth={3} />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Your cart</Text>
                    <Text className="text-center text-gray-500">Restaurant Name</Text>
                </View>
            </View>

            {/* Delivery Time */}
            <View
                style={{ backgroundColor: themeColors.bgColor(0.2) }}
                className="flex-row px-4 items-center"
            >
                <Image
                    source={require("../assets/images/bikeGuy.png")}
                    className="w-20 h-20 rounded-full"
                />

                <Text className="flex-1 pl-4">Delivers in 20-30 minutes</Text>

                <TouchableOpacity>
                    <Text style={{ color: themeColors.text }} className="font-bold">
                        Change
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Dishes */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="bg-white pt-5"
                contentContainerStyle={{
                    paddingBottom: 50,
                }}
            >
                {Object.entries(groupedItems).map(([key, items]) => {
                    let dish = items[0];
                    return (
                        <View
                            key={key}
                            className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
                        >
                            <Text style={{ color: themeColors.text }} className="font-bold">
                                {items.length} x
                            </Text>
                            <Image className="h-14 w-14 rounded-full" source={dish.image} />
                            <Text className="flex-1 font-bold text-gray-700">Name</Text>
                            <Text className="font-semibold text-base">${dish.price}</Text>
                            <TouchableOpacity
                                onPress={() => dispatch(removeFromCart({ id: dish.id }))}
                                className="p-1 rounded-full"
                                style={{ backgroundColor: themeColors.bgColor(1) }}
                            >
                                <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>

            {/* Totals */}
            <View
                style={{ backgroundColor: themeColors.bgColor(0.2) }}
                className=" p-6 px-8 rounded-t-3xl space-y-4"
            >
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Subtotal</Text>
                    <Text className="text-gray-700">${cartTotal}</Text>
                </View>

                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Delivery Fee</Text>
                    <Text className="text-gray-700">${deliveryFee}</Text>
                </View>

                <View className="flex-row justify-between">
                    <Text className="font-extrabold">Order Total</Text>
                    <Text className="font-extrabold">${deliveryFee + cartTotal}</Text>
                </View>

                <View>
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgColor(1) }}
                        onPress={() => navigation.navigate("OrderPreparing")}
                        className="p-3 rounded-full"
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            Place Order
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Cart;
