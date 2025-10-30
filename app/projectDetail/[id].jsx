import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DataTable } from "react-native-paper";
import { NumericFormat } from "react-number-format";
import { recipeDetailStyles } from "../../assets/styles/recipe-detail.styles";
import CategoryFilter from "../../components/CategoryFilter";
import LoadingSpinner from "../../components/LoadingSpinner";
import RequestByStatusCard from "../../components/RequestByStatusCard";
import { COLORS } from "../../constants/colors";
import { AuthContext } from "../../utils/authContext";
import { FetchProjectAPI } from "../hooks/ProjectHook";
import { RequestDataAPI } from "../hooks/RequestHook";

const ProgressReportDetailScreen = () => {
  const { id: projectId } = useLocalSearchParams();
  const router = useRouter();
  const [projectDetail, setProjectDetail] = useState(null);
  const [progressReport, setProgressReport] = useState([]);
  const [requestResultset, setRequestResultset] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedCategoryText, setSelectedCategoryText] = useState(null);
  const authContext = useContext(AuthContext);

  const progressReportResult = FetchProjectAPI.useFetchDetail(
    projectId,
    authContext.userToken
  );

  const requests = RequestDataAPI.UseFetchRequestByStateandProject(
    selectedCategory || 0,
    projectId,
    authContext.userToken
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    let stateMachine = projectDetail.ClaimList.filter(function (currentObj) {
      return currentObj.Value === category;
    });

    setSelectedCategoryText(stateMachine[0].Text);
  };
  useEffect(() => {
    if (progressReportResult.data) {
      setProjectDetail(progressReportResult.data[0]);
      setProgressReport(progressReportResult.data);

      if (!selectedCategory) {
        setSelectedCategory(progressReportResult.data[0].ClaimList[0].Value);
        setSelectedCategoryText(progressReportResult.data[0].ClaimList[0].Text);
      }

      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [progressReportResult.data, selectedCategory]);

  useEffect(() => {
    if (requests.data) {
      setRequestResultset(requests.data);
    } else {
    }
  }, [requests.data]);

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
              source={require("../../assets/images/bg-1.png")}
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
              <Text style={recipeDetailStyles.categoryText}>
                {projectDetail.Name}
              </Text>
            </View>
            <Text style={recipeDetailStyles.recipeTitle}>
              {projectDetail.Organisation}
            </Text>
            {projectDetail.Name && (
              <View style={recipeDetailStyles.locationRow}>
                <Ionicons name="location" size={16} color={COLORS.white} />
                <Text style={recipeDetailStyles.locationText}>
                  Status: {projectDetail.ProjectStatus}
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
                {projectDetail.RequestCount}
              </Text>
              <Text style={recipeDetailStyles.statLabel}>Requests</Text>
            </View>

            <View style={recipeDetailStyles.statCard}>
              <LinearGradient
                colors={["#4ECDC4", "#44A08D"]}
                style={recipeDetailStyles.statIconContainer}
              >
                <Ionicons name="people" size={20} color={COLORS.white} />
              </LinearGradient>
              <Text style={recipeDetailStyles.statValue}>
                {projectDetail.UnitCount}
              </Text>
              <Text style={recipeDetailStyles.statLabel}>Sites</Text>
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
              <Text style={recipeDetailStyles.sectionTitle}>Summary</Text>
            </View>
          </View>
          <View style={recipeDetailStyles.instructionsContainer}>
            <View>
              <View style={recipeDetailStyles.instructionCard}>
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primary + "CC"]}
                  style={recipeDetailStyles.stepIndicator}
                >
                  <Text style={recipeDetailStyles.stepNumber}>{}</Text>
                </LinearGradient>
                <View style={recipeDetailStyles.instructionContent}>
                  <Text style={recipeDetailStyles.instructionText}>{}</Text>

                  <View style={recipeDetailStyles.ingredientsGrid}>
                    <DataTable>
                      <DataTable.Row>
                        <DataTable.Cell>Project</DataTable.Cell>
                        <DataTable.Cell text>
                          {projectDetail.Name}
                        </DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row>
                        <DataTable.Cell>Project No</DataTable.Cell>
                        <DataTable.Cell>
                          {projectDetail.ProjectNo}
                        </DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row>
                        <DataTable.Cell>Type</DataTable.Cell>
                        <DataTable.Cell>
                          {projectDetail.ProjectType}
                        </DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row>
                        <DataTable.Cell>Status</DataTable.Cell>
                        <DataTable.Cell>
                          {projectDetail.ProjectStatus}
                        </DataTable.Cell>
                      </DataTable.Row>

                      <DataTable.Row>
                        <DataTable.Cell>Contractor</DataTable.Cell>
                        <DataTable.Cell text>
                          {projectDetail.Organisation}
                        </DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row>
                        <DataTable.Cell>District Council</DataTable.Cell>
                        <DataTable.Cell text>
                          {projectDetail.DistrictCouncil}
                        </DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row>
                        <DataTable.Cell>Municipality</DataTable.Cell>
                        <DataTable.Cell text>
                          {projectDetail.LocalMunicipality}
                        </DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row>
                        <DataTable.Cell>Amount</DataTable.Cell>
                        <DataTable.Cell>
                          <NumericFormat
                            displayType={"text"}
                            value={projectDetail.Amount}
                            prefix={"R"}
                            decimalScale={2}
                            thousandSeparator=","
                          />
                        </DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row>
                        <DataTable.Cell>Sites</DataTable.Cell>
                        <DataTable.Cell>
                          <NumericFormat
                            displayType={"text"}
                            value={projectDetail.UnitCount}
                          />
                        </DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row>
                        <DataTable.Cell>Claims</DataTable.Cell>
                        <DataTable.Cell>
                          <NumericFormat
                            displayType={"text"}
                            value={projectDetail.RequestCount}
                          />
                        </DataTable.Cell>
                      </DataTable.Row>
                    </DataTable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={recipeDetailStyles.contentSection}>
          {/* INSTRUCTIONS SECTION */}
          <View style={recipeDetailStyles.sectionContainer}>
            <View style={recipeDetailStyles.sectionTitleRow}>
              <LinearGradient
                colors={["#9C27B0", "#673AB7"]}
                style={recipeDetailStyles.sectionIcon}
              >
                <Ionicons name="book" size={16} color={COLORS.white} />
              </LinearGradient>
              <Text style={recipeDetailStyles.sectionTitle}>Milestones</Text>
            </View>
          </View>
          <View style={recipeDetailStyles.sectionContainer}>
            <View style={recipeDetailStyles.ingredientCard}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>No.</DataTable.Title>
                  <DataTable.Title>Name</DataTable.Title>
                  <DataTable.Title>Sites</DataTable.Title>
                </DataTable.Header>

                {projectDetail.MilestoneList.map((item) => (
                  <DataTable.Row key={item.Id}>
                    <DataTable.Cell>{item.Ordinal}</DataTable.Cell>
                    <DataTable.Cell>{item.Name}</DataTable.Cell>
                    <DataTable.Cell>{item.Count}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
          </View>
        </View>

        <View style={recipeDetailStyles.contentSection}>
          {/* INSTRUCTIONS SECTION */}
          <View style={recipeDetailStyles.sectionContainer}>
            <View style={recipeDetailStyles.sectionTitleRow}>
              <LinearGradient
                colors={["#9C27B0", "#673AB7"]}
                style={recipeDetailStyles.sectionIcon}
              >
                <Ionicons name="book" size={16} color={COLORS.white} />
              </LinearGradient>
              <Text style={recipeDetailStyles.sectionTitle}>Requests</Text>
            </View>
            {projectDetail.ClaimList.length > 0 && (
              <CategoryFilter
                categories={projectDetail.ClaimList}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
            )}

            <View style={recipeDetailStyles.recipesSection}>
              <View style={recipeDetailStyles.sectionHeader}>
                <Text style={recipeDetailStyles.sectionTitle}>
                  {selectedCategoryText}
                </Text>
              </View>
              {requestResultset.length > 0 ? (
                <FlatList
                  data={requestResultset}
                  renderItem={({ item }) => (
                    <RequestByStatusCard requestResultSet={item} />
                  )}
                  keyExtractor={(item) => item.Id.toString()}
                  numColumns={2}
                  columnWrapperStyle={recipeDetailStyles.row}
                  contentContainerStyle={recipeDetailStyles.recipesGrid}
                  scrollEnabled={false}
                  // ListEmptyComponent={}
                />
              ) : (
                <View style={recipeDetailStyles.emptyState}>
                  <Ionicons
                    name="restaurant-outline"
                    size={64}
                    color={COLORS.textLight}
                  />
                  <Text style={recipeDetailStyles.emptyTitle}>
                    No request found
                  </Text>
                  <Text style={recipeDetailStyles.emptyDescription}>
                    Try a different category
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgressReportDetailScreen;
