import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { homeStyles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export default function ProjectCard({ projectResult }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={homeStyles.container}
      onPress={() => router.push(`/project/${projectResult.Id}`)}
      activeOpacity={0.8}
    >
      <View style={homeStyles.featuredSection}>
        <TouchableOpacity
          style={homeStyles.featuredCard}
          activeOpacity={0.9}
          onPress={() => router.push(`/projectDetail/${projectResult.Id}`)}
        >
          <View style={homeStyles.featuredImageContainer}>
            <Image
              source={require("../assets/images/ReportBackground.png")}
              style={homeStyles.featuredImage}
              contentFit="cover"
              transition={500}
            />
            <View style={homeStyles.featuredOverlay}>
              <View style={homeStyles.featuredBadge}>
                <Text style={homeStyles.featuredBadgeText}>
                  {projectResult.Name}
                </Text>
              </View>

              <View style={homeStyles.featuredContent}>
                <Text style={homeStyles.featuredTitle} numberOfLines={2}>
                  {projectResult.Organisation}
                </Text>

                <View style={homeStyles.featuredMeta}>
                  <View style={homeStyles.metaItem}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={COLORS.white}
                    />
                    <Text style={homeStyles.metaText}>
                      {projectResult.ProjectStatus}
                    </Text>
                  </View>
                  <View style={homeStyles.metaItem}>
                    <Ionicons
                      name="people-outline"
                      size={16}
                      color={COLORS.white}
                    />
                    <Text style={homeStyles.metaText}>
                      {projectResult.ProjectType}
                    </Text>
                  </View>

                  {projectResult.Id && (
                    <View style={homeStyles.metaItem}>
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color={COLORS.white}
                      />
                      <Text style={homeStyles.metaText}>
                        {projectResult.Id}
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
