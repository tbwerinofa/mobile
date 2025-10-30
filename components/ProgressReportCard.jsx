import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { NumericFormat } from "react-number-format";
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
              source={require("../assets/images/ReportBackground.png")}
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
                      name="list-outline"
                      size={16}
                      color={COLORS.white}
                    />
                    <Text style={homeStyles.metaText}>
                      Active Sites :{progressReportResult.CurrentCount}
                    </Text>
                  </View>
                  <View style={homeStyles.metaItem}>
                    <Ionicons
                      name="cash-outline"
                      size={16}
                      color={COLORS.white}
                    />
                    <Text style={homeStyles.metaText}>
                      Claims :
                      <NumericFormat
                        displayType={"text"}
                        value={progressReportResult.CurrentClaim}
                        prefix={"R"}
                        decimalScale={2}
                        thousandSeparator=","
                      />
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
