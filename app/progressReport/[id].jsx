import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { recipeDetailStyles } from "../../assets/styles/recipe-detail.styles";
import LoadingSpinner from "../../components/LoadingSpinner";
import { COLORS } from "../../constants/colors";
import { AuthContext } from "../../utils/authContext";
import { FetchProgressReportListDataAPI } from "../hooks/ProgressReportHook";

const ProgressReportDetailScreen = () => {
  const { id: progressReportId } = useLocalSearchParams();
  const router = useRouter();
  const [projectDetail, setProjectDetail] = useState(null);
  const [progressReport, setProgressReport] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  const getYouTubeEmbedUrl = (url) => {
    // example url: https://www.youtube.com/watch?v=mTvlmY4vCug
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleToggleSave = async () => {
    setIsSaving(true);
  };

  if (loading) return <LoadingSpinner message="Loading report details..." />;

  return (
    <View style={recipeDetailStyles.container}>
      <ScrollView>
        {/* HEADER */}
        <View style={recipeDetailStyles.headerContainer}>
          <View style={recipeDetailStyles.imageContainer}>
            <Image
              source={require("../../assets/images/pork.png")}
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

            <TouchableOpacity
              style={[
                recipeDetailStyles.floatingButton,
                { backgroundColor: isSaving ? COLORS.gray : COLORS.primary },
              ]}
              onPress={handleToggleSave}
              disabled={isSaving}
            >
              <Ionicons
                name={
                  isSaving
                    ? "hourglass"
                    : isSaved
                    ? "bookmark"
                    : "bookmark-outline"
                }
                size={24}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={recipeDetailStyles.titleSection}>
            <View style={recipeDetailStyles.categoryBadge}>
              <Text style={recipeDetailStyles.categoryText}>
                {projectDetail.ReportDateString}
              </Text>
            </View>
            <Text style={recipeDetailStyles.recipeTitle}>
              {projectDetail.ReportDateString}
            </Text>
            {projectDetail.ReportDateString && (
              <View style={recipeDetailStyles.locationRow}>
                <Ionicons name="location" size={16} color={COLORS.white} />
                <Text style={recipeDetailStyles.locationText}>
                  {projectDetail.ReportDateString} milestone
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
                <Ionicons name="time" size={20} color={COLORS.white} />
              </LinearGradient>
              <Text style={recipeDetailStyles.statValue}>
                {projectDetail.ReportDateString}
              </Text>
              <Text style={recipeDetailStyles.statLabel}>Active Projects</Text>
            </View>

            <View style={recipeDetailStyles.statCard}>
              <LinearGradient
                colors={["#4ECDC4", "#44A08D"]}
                style={recipeDetailStyles.statIconContainer}
              >
                <Ionicons name="people" size={20} color={COLORS.white} />
              </LinearGradient>
              <Text style={recipeDetailStyles.statValue}>
                {projectDetail.ReportDateString}
              </Text>
              <Text style={recipeDetailStyles.statLabel}>Servings</Text>
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
                    <View style={recipeDetailStyles.instructionFooter}>
                      <Text style={recipeDetailStyles.stepLabel}>
                        Claims: {instruction.Units}
                      </Text>
                      <Text style={recipeDetailStyles.stepLabel}>
                        Amount: {instruction.CurrentClaim}
                      </Text>
                      <Text style={recipeDetailStyles.stepLabel}>
                        TotalClaimed: {instruction.TotalClaimed}
                      </Text>
                      <Text style={recipeDetailStyles.stepLabel}>
                        BalanceClaim: {instruction.BalanceClaim}
                      </Text>
                      <TouchableOpacity
                        style={recipeDetailStyles.completeButton}
                      >
                        <Ionicons
                          name="checkmark"
                          size={16}
                          color={COLORS.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Milestones SECTION */}
                <View style={recipeDetailStyles.sectionContainer}>
                  <View style={recipeDetailStyles.sectionTitleRow}>
                    <LinearGradient
                      colors={[COLORS.primary, COLORS.primary + "80"]}
                      style={recipeDetailStyles.sectionIcon}
                    >
                      <Ionicons name="list" size={16} color={COLORS.white} />
                    </LinearGradient>
                    <Text style={recipeDetailStyles.sectionTitle}>
                      Milestones
                    </Text>
                    <View style={recipeDetailStyles.countBadge}>
                      <Text style={recipeDetailStyles.countText}>
                        {instruction.MilestoneResultSet.length}
                      </Text>
                    </View>
                  </View>

                  <View style={recipeDetailStyles.ingredientsGrid}>
                    {instruction.MilestoneResultSet.map((ingredient, index) => (
                      <View
                        key={index}
                        style={recipeDetailStyles.ingredientCard}
                      >
                        <View style={recipeDetailStyles.ingredientNumber}>
                          <Text style={recipeDetailStyles.ingredientNumberText}>
                            {index + 1}
                          </Text>
                        </View>
                        <Text style={recipeDetailStyles.ingredientText}>
                          {ingredient.MilestoneDefinition}
                        </Text>
                        <View style={recipeDetailStyles.ingredientCheck}>
                          <Ionicons
                            name="checkmark-circle-outline"
                            size={20}
                            color={COLORS.textLight}
                          />
                        </View>
                      </View>
                    ))}
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
