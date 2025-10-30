import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from "react-native-paper";
import { NumericFormat } from "react-number-format";
import { recipeDetailStyles } from "../../assets/styles/recipe-detail.styles";
import LoadingSpinner from "../../components/LoadingSpinner";
import WeeklyProgressMilestoneCard from "../../components/WeeklyProgressMilestoneCard";
import { COLORS } from "../../constants/colors";
import { AuthContext } from "../../utils/authContext";
import { FetchProgressReportListDataAPI } from "../hooks/ProgressReportHook";
const ProgressReportDetailScreen = () => {
  const { id: progressReportId } = useLocalSearchParams();
  const router = useRouter();
  const [projectDetail, setProjectDetail] = useState(null);
  const [progressReport, setProgressReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);

  const progressReportResult =
    FetchProgressReportListDataAPI.useFetchProgressReportById(
      progressReportId,
      authContext.userToken
    );

  useEffect(() => {
    if (progressReportResult.data) {
      setProjectDetail(progressReportResult.data[0]);
      setProgressReport(progressReportResult.data);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [progressReportResult.data]);

  if (loading) return <LoadingSpinner message="Loading report details..." />;

  return (
    <View style={recipeDetailStyles.container}>
      <ScrollView>
        {/* HEADER */}
        <View style={recipeDetailStyles.headerContainer}>
          <View style={recipeDetailStyles.imageContainer}>
            <Image
              source={require("../../assets/images/undraw_financial-data_lbci.svg")}
              style={recipeDetailStyles.headerImage}
              contentFit="cover"
            />
          </View>

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
            style={recipeDetailStyles.gradientOverlay}
          />
          <View style={recipeDetailStyles.floatingButtons}>
            <TouchableOpacity
              style={recipeDetailStyles.floatingButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          {/* Title Section */}
          <View style={recipeDetailStyles.titleSection}>
            <View style={recipeDetailStyles.categoryBadge}>
              <Text style={recipeDetailStyles.categoryText}>Weekly Report</Text>
            </View>
            <Text style={recipeDetailStyles.recipeTitle}>
              {projectDetail.ReportDateString}
            </Text>
            {projectDetail.Tenant && (
              <View style={recipeDetailStyles.locationRow}>
                <Ionicons name="business" size={16} color={COLORS.white} />
                <Text style={recipeDetailStyles.locationText}>
                  {projectDetail.Tenant}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={recipeDetailStyles.contentSection}>
          {/* QUICK STATS */}
          <View style={recipeDetailStyles.statsContainer}>
            <View style={recipeDetailStyles.statCard}>
              <LinearGradient
                colors={["#FF6B6B", "#FF8E53"]}
                style={recipeDetailStyles.statIconContainer}
              >
                <Ionicons name="list" size={20} color={COLORS.white} />
              </LinearGradient>
              <Text style={recipeDetailStyles.statValue}>
                {progressReport.reduce((acc, next) => {
                  return acc + next.CurrentCount;
                }, 0)}
              </Text>
              <Text style={recipeDetailStyles.statLabel}>Active Sites</Text>
            </View>

            <View style={recipeDetailStyles.statCard}>
              <LinearGradient
                colors={["#4ECDC4", "#44A08D"]}
                style={recipeDetailStyles.statIconContainer}
              >
                <Ionicons name="cash" size={20} color={COLORS.white} />
              </LinearGradient>
              <NumericFormat
                style={recipeDetailStyles.statValue}
                displayType={"text"}
                value={progressReport.reduce((acc, next) => {
                  return acc + next.CurrentClaim;
                }, 0)}
                prefix={"R"}
                decimalScale={2}
                thousandSeparator=" "
              />
              <Text style={recipeDetailStyles.statLabel}>Claim Amount</Text>
            </View>
          </View>
          {/* INSTRUCTIONS SECTION */}
          <View style={recipeDetailStyles.sectionContainer}>
            <View style={recipeDetailStyles.sectionTitleRow}>
              <LinearGradient
                colors={["#9C27B0", "#673AB7"]}
                style={recipeDetailStyles.sectionIcon}
              >
                <Ionicons name="book" size={16} color={COLORS.white} />
              </LinearGradient>
              <Text style={recipeDetailStyles.sectionTitle}>Projects</Text>
              <View style={recipeDetailStyles.countBadge}>
                <Text style={recipeDetailStyles.countText}>
                  {progressReport.length}
                </Text>
              </View>
            </View>
          </View>
          <View style={recipeDetailStyles.instructionsContainer}>
            {progressReport.map((instruction, index) => (
              <View key={index + 100}>
                <View key={index} style={recipeDetailStyles.instructionCard}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.primary + "CC"]}
                    style={recipeDetailStyles.stepIndicator}
                  >
                    <Text style={recipeDetailStyles.stepNumber}>
                      {index + 1}
                    </Text>
                  </LinearGradient>
                  <View style={recipeDetailStyles.instructionContent}>
                    <Text style={recipeDetailStyles.instructionText}>
                      {instruction.Project}
                    </Text>

                    <View style={recipeDetailStyles.ingredientsGrid}>
                      <DataTable>
                        <DataTable.Row key={instruction.ProjectId + 1}>
                          <DataTable.Cell>Milestone</DataTable.Cell>
                          <DataTable.Cell text numeric>
                            {instruction.MilestoneResultSet.length}
                          </DataTable.Cell>
                          <DataTable.Cell></DataTable.Cell>
                          <DataTable.Cell>Claim to Date</DataTable.Cell>
                          <DataTable.Cell numeric>
                            <NumericFormat
                              displayType={"text"}
                              value={instruction.TotalClaimed}
                              prefix={"R"}
                              decimalScale={2}
                              thousandSeparator=" "
                            />
                          </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row key={instruction.ProjectId + 2}>
                          <DataTable.Cell>Current Claim</DataTable.Cell>
                          <DataTable.Cell numeric>
                            <NumericFormat
                              displayType={"text"}
                              value={instruction.CurrentClaim}
                              prefix={"R"}
                              decimalScale={2}
                              thousandSeparator=","
                            />
                          </DataTable.Cell>
                          <DataTable.Cell></DataTable.Cell>
                          <DataTable.Cell>Balance Claim</DataTable.Cell>
                          <DataTable.Cell numeric>
                            {" "}
                            <NumericFormat
                              displayType={"text"}
                              value={instruction.BalanceClaim}
                              prefix={"R"}
                              decimalScale={2}
                              thousandSeparator=","
                            />
                          </DataTable.Cell>
                        </DataTable.Row>
                      </DataTable>
                    </View>

                    <WeeklyProgressMilestoneCard
                      weeklyProgressCache={instruction}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgressReportDetailScreen;
