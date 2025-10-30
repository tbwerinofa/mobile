import { Image } from "expo-image";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { homeStyles } from "../assets/styles/home.styles";

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <View style={homeStyles.categoryFilterContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={homeStyles.categoryFilterScrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.Text;
          return (
            <TouchableOpacity
              key={category.Id}
              style={[
                homeStyles.categoryButton,
                isSelected && homeStyles.selectedCategory,
              ]}
              onPress={() => onSelectCategory(category.Value)}
              activeOpacity={0.7}
            >
              <Image
                source={`${category.Value2}`}
                style={[
                  homeStyles.categoryImage,
                  isSelected && homeStyles.selectedCategoryImage,
                ]}
                contentFit="cover"
                transition={300}
              />

              <Text
                style={[
                  homeStyles.categoryText,
                  isSelected && homeStyles.selectedCategoryText,
                ]}
              >
                {category.Text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
