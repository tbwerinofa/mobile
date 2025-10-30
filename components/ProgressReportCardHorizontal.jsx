import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { homeStyles } from "../assets/styles/home.styles";
export default function ProgressReportCardHorizontal({
  progressReportCache,
  selectedCategory,
  onSelectCategory,
}) {
  const router = useRouter();

  return (
    <View style={homeStyles.categoryFilterContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={homeStyles.categoryFilterScrollContent}
      >
        {progressReportCache.map((progressReportResult) => {
          return (
            <TouchableOpacity
              style={homeStyles.categoryButton}
              key={progressReportResult.Id}
              onPress={() =>
                router.push(`/progressReport/${progressReportResult.Id}`)
              }
              activeOpacity={0.7}
            >
              <View style={homeStyles.imageContainer}>
                <Image
                  source={require("../assets/images/bg-1.png")}
                  style={homeStyles.categoryImage}
                  contentFit="cover"
                  transition={300}
                />
              </View>
              <View style={homeStyles.content}>
                <Text style={homeStyles.title} numberOfLines={2}>
                  {progressReportResult.ReportDateString}
                </Text>
                <Text style={homeStyles.description} numberOfLines={2}>
                  {progressReportResult.Tenant}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
