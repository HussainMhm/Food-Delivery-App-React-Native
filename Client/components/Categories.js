import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";

import { getCategories } from "../api";
import { urlFor } from "../sanity";

function Categories(props) {
    const [activeCategory, setActiveCategory] = useState(null);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((data) => {
            console.log("got data", data[0]);
            setCategories(data);
        });
    }, []);

    return (
        <View className="mt-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="overflow-visible"
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
            >
                {categories?.map((category) => {
                    let isActive = category._id == activeCategory;
                    let btnClass = isActive ? "bg-gray-600" : "bg-gray-200";
                    let textColor = isActive ? "font-semibold text-gray-800" : "text-gray-500";

                    return (
                        <View key={category._id} className="justify-center items-center mr-6">
                            <TouchableOpacity
                                className={"p-1 rounded-full shadow bg-gray-200 " + btnClass}
                                onPress={() => setActiveCategory(category._id)}
                            >
                                <Image
                                    style={{ width: 45, height: 45 }}
                                    source={
                                        {
                                            // uri: urlFor(category.image).url(),
                                        }
                                    }
                                />
                            </TouchableOpacity>
                            <Text className={"text-sm " + textColor}>{category.name}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default Categories;
