import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { recipeCardStyles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export default function RequestByStatusCard({ requestResultSet }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={recipeCardStyles.container}
      onPress={() => router.push(`/requestDetail/${requestResultSet.Id}`)}
      activeOpacity={0.8}
    >
      <View style={recipeCardStyles.imageContainer}>
        <Image
          source={require("../assets/images/bg-1.png")}
          style={recipeCardStyles.image}
          contentFit="cover"
          transition={300}
        />
      </View>

      <View style={recipeCardStyles.content}>
        <Text style={recipeCardStyles.title} numberOfLines={2}>
          {requestResultSet.Project}
        </Text>
        {requestResultSet.RequestNo && (
          <Text style={recipeCardStyles.description} numberOfLines={2}>
            Claim No: {requestResultSet.RequestNo}
          </Text>
        )}

        <View style={recipeCardStyles.footer}>
          {requestResultSet.Project && (
            <View style={recipeCardStyles.timeContainer}>
              <Ionicons
                name="time-outline"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={recipeCardStyles.timeText}>
                {requestResultSet.RequestDateString}
              </Text>
            </View>
          )}
          {requestResultSet.RequestDateString && (
            <View style={recipeCardStyles.servingsContainer}>
              <Ionicons
                name="bar-chart-outline"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={recipeCardStyles.servingsText}>
                {requestResultSet.ResidentialUnits}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
