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
      onPress={() => router.push(`${recipe.Url}`)}
      activeOpacity={0.8}
    >
      <View style={recipeCardStyles.imageContainer}>
        <Image
          source={{ uri: recipe.image }}
          style={recipeCardStyles.image}
          contentFit="cover"
          transition={300}
        />
      </View>

      <View style={recipeCardStyles.content}>
        <Text style={recipeCardStyles.title} numberOfLines={2}>
          {recipe.Message}
        </Text>

        <Text style={recipeCardStyles.description} numberOfLines={2}>
          {recipe.Name}
        </Text>
        <Text style={recipeCardStyles.description} numberOfLines={2}>
          Status: {recipe.Status}
        </Text>

        <View style={recipeCardStyles.footer}>
          {recipe.Group && (
            <View style={recipeCardStyles.timeContainer}>
              <Ionicons
                name="time-outline"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={recipeCardStyles.timeText}>
                Sites: {recipe.Count}
              </Text>
            </View>
          )}
          {recipe.Name && (
            <View style={recipeCardStyles.servingsContainer}>
              <Ionicons
                name="people-outline"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={recipeCardStyles.servingsText}>
                {recipe.DateTimeStampString}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
