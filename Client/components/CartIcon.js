import { View, Text, TouchableOpacity } from "react-native";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

function CartIcon(props) {
    const navigation = useNavigation();
    return (
        <View className="absolute bottom-5 w-full z-50">
            <TouchableOpacity
                style={{ backgroundColor: themeColors.bgColor(1) }}
                className="flex-row justify-between items-center mx-5 rounded-full p-4 shadow-lg"
                onPress={() => navigation.navigate("Cart")}
            >
                {/* Cart Item Quantity */}
                <View
                    className="p-2 px-4 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                >
                    <Text className="font-extrabold text-white text-lg">{2}</Text>
                </View>

                {/* Button Name */}
                <Text className="flex-1 text-center font-extrabold text-white text-lg">
                    View Cart
                </Text>

                {/* Cart Total */}
                <Text className="font-extrabold text-white text-lg">${314.2}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CartIcon;
