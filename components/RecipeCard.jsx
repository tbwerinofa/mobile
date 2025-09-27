import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { recipeCardStyles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export default function RecipeCard({ recipe }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={recipeCardStyles.container}
      onPress={() => router.push(`/recipe/${recipe.id}`)}
      activeOpacity={0.8}
    >
      <View style={recipeCardStyles.imageContainer}>
        <Image
          source={require("../assets/images/pork.png")}
          style={recipeCardStyles.image}
          contentFit="cover"
          transition={300}
        />
      </View>

      <View style={recipeCardStyles.content}>
        <Text style={recipeCardStyles.title} numberOfLines={2}>
          {recipe.Project}
        </Text>
        {recipe.RequestNo && (
          <Text style={recipeCardStyles.description} numberOfLines={2}>
            {recipe.RequestDateString}
          </Text>
        )}

        <View style={recipeCardStyles.footer}>
          {recipe.Project && (
            <View style={recipeCardStyles.timeContainer}>
              <Ionicons
                name="time-outline"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={recipeCardStyles.timeText}>
                {recipe.RequestDateString}
              </Text>
            </View>
          )}
          {recipe.RequestDateString && (
            <View style={recipeCardStyles.servingsContainer}>
              <Ionicons
                name="people-outline"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={recipeCardStyles.servingsText}>
                {recipe.RequestDateString}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
