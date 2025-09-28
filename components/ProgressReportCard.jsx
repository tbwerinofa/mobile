import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { homeStyles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export default function ProgressReportCard({ progressReportResult }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={homeStyles.container}
      onPress={() => router.push(`/progressReport/${progressReportResult.Id}`)}
      activeOpacity={0.8}
    >
      <View style={homeStyles.featuredSection}>
        <TouchableOpacity
          style={homeStyles.featuredCard}
          activeOpacity={0.9}
          onPress={() =>
            router.push(`/progressReport/${progressReportResult.Id}`)
          }
        >
          <View style={homeStyles.featuredImageContainer}>
            <Image
              source={require("../assets/images/pork.png")}
              style={homeStyles.featuredImage}
              contentFit="cover"
              transition={500}
            />
            <View style={homeStyles.featuredOverlay}>
              <View style={homeStyles.featuredBadge}>
                <Text style={homeStyles.featuredBadgeText}>
                  {progressReportResult.Tenant}
                </Text>
              </View>

              <View style={homeStyles.featuredContent}>
                <Text style={homeStyles.featuredTitle} numberOfLines={2}>
                  {progressReportResult.ReportDateString}
                </Text>

                <View style={homeStyles.featuredMeta}>
                  <View style={homeStyles.metaItem}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={COLORS.white}
                    />
                    <Text style={homeStyles.metaText}>
                      {progressReportResult.ReportDateString}
                    </Text>
                  </View>
                  <View style={homeStyles.metaItem}>
                    <Ionicons
                      name="people-outline"
                      size={16}
                      color={COLORS.white}
                    />
                    <Text style={homeStyles.metaText}>
                      {progressReportResult.CurrentClaim}
                    </Text>
                  </View>

                  {progressReportResult.Id && (
                    <View style={homeStyles.metaItem}>
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color={COLORS.white}
                      />
                      <Text style={homeStyles.metaText}>
                        {progressReportResult.Id}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
