import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from "react-native-paper";
import { NumericFormat } from "react-number-format";
import { homeStyles } from "../../assets/styles/home.styles";
import { recipeDetailStyles } from "../../assets/styles/recipe-detail.styles";
import { COLORS } from "../../constants/colors";
import { AuthContext } from "../../utils/authContext";
import { FetchProjectAPI } from "../hooks/ProjectHook";
const ProjectScreen = () => {
  const router = useRouter();
  const [cacheProjectResult, setProjectResult] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedClaims, setSelectedClaims] = useState(0);
  const [selectedCategoryText, setSelectedCategoryText] = useState(null);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const authContext = useContext(AuthContext);

  const projectResult = FetchProjectAPI.useFetchList(authContext.userToken);

  useEffect(() => {
    if (projectResult.data) {
      let claims = 0;
      setProjectResult(projectResult.data);

      for (let i = 0; i < projectResult.data.length; i++) {
        claims += projectResult.data[i].RequestCount;
      }
      setSelectedClaims(claims);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [projectResult.data]);

  return (
    <View style={homeStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.scrollContent}
      >
        {" "}
        {/* HEADER */}
        <View style={recipeDetailStyles.headerContainer}>
          <View style={recipeDetailStyles.imageContainer}>
            <Image
              source={require("../../assets/images/undraw_under-construction_c2y1.svg")}
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
              <Text style={recipeDetailStyles.categoryText}>CIVBIZ Group</Text>
            </View>
            <Text style={recipeDetailStyles.recipeTitle}>Project List</Text>
            <View style={recipeDetailStyles.locationRow}>
              <Ionicons name="location" size={16} color={COLORS.white} />
              <Text style={recipeDetailStyles.locationText}>
                Project Management
              </Text>
            </View>
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
                {cacheProjectResult.length}
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
              <Text style={recipeDetailStyles.statValue}>{selectedClaims}</Text>
              <Text style={recipeDetailStyles.statLabel}>Claims</Text>
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
                  {cacheProjectResult.length}
                </Text>
              </View>
            </View>

            <View style={recipeDetailStyles.instructionsContainer}>
              {cacheProjectResult.map((instruction, index) => (
                <View key={index} style={recipeDetailStyles.instructionCard}>
                  <TouchableOpacity
                    style={homeStyles.container}
                    onPress={() =>
                      router.push(`/projectDetail/${instruction.Id}`)
                    }
                    activeOpacity={0.8}
                  >
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
                        {instruction.Name}
                      </Text>

                      <View style={recipeDetailStyles.ingredientsGrid}>
                        <DataTable>
                          <DataTable.Row key={instruction.Id + 1}>
                            <DataTable.Cell>Contractor</DataTable.Cell>
                            <DataTable.Cell text>
                              {instruction.Organisation}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row key={instruction.Id + 2}>
                            <DataTable.Cell>Status</DataTable.Cell>
                            <DataTable.Cell text>
                              {instruction.ProjectStatus}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row key={instruction.Id + 2}>
                            <DataTable.Cell>Approved Units</DataTable.Cell>
                            <DataTable.Cell text>
                              <NumericFormat
                                displayType={"text"}
                                value={instruction.UnitCount}
                              />
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row key={instruction.Id + 2}>
                            <DataTable.Cell>Total Claims</DataTable.Cell>
                            <DataTable.Cell text>
                              <NumericFormat
                                displayType={"text"}
                                value={instruction.RequestCount}
                              />
                            </DataTable.Cell>
                          </DataTable.Row>
                        </DataTable>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View style={homeStyles.recipesSection}>
            <View style={homeStyles.sectionHeader}>
              <Text style={homeStyles.sectionTitle}>
                {selectedCategoryText}
              </Text>
            </View>
          </View>{" "}
        </View>
      </ScrollView>
    </View>
  );
};
export default ProjectScreen;
