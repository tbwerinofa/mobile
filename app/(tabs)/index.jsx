import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { homeStyles } from "../../assets/styles/home.styles";
import CategoryFilter from "../../components/CategoryFilter";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProgressReportCardHorizontal from "../../components/ProgressReportCardHorizontal";
import RequestByStatusCard from "../../components/RequestByStatusCard";
import { COLORS } from "../../constants/colors";
import { AuthContext } from "../../utils/authContext";
import { FetchProgressReportListDataAPI } from "../hooks/ProgressReportHook";
import { RequestDataAPI } from "../hooks/RequestHook";
import { FetchStandingDataAPI } from "../hooks/WorkFlowHook";

const HomeScreen = () => {
  const router = useRouter();
  const [cacheProgressReport, setProgressReport] = useState([]);
  const [requestResultset, setRequestResultset] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedCategoryText, setSelectedCategoryText] = useState(null);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const authContext = useContext(AuthContext);

  const apiStateMachines = FetchStandingDataAPI.UseFetchStateMachines(
    authContext.userToken
  );

  const progressReportResult =
    FetchProgressReportListDataAPI.useFetchProgressReportList(
      authContext.userToken
    );

  const requests = RequestDataAPI.UseFetchRequests(
    selectedCategory || 0,
    authContext.userToken
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    let stateMachine = categories.filter(function (currentObj) {
      return currentObj.Value === category;
    });

    setSelectedCategoryText(stateMachine[0].Text);
  };

  useEffect(() => {
    if (apiStateMachines.data) {
      setCategories(apiStateMachines.data);
      if (!selectedCategory) {
        setSelectedCategory(apiStateMachines.data[0].Value);
        setSelectedCategoryText(apiStateMachines.data[0].Text);
      }
    }
  }, [apiStateMachines.data, selectedCategory]);

  useEffect(() => {
    if (progressReportResult.data) {
      setProgressReport(progressReportResult.data);
    }
  }, [progressReportResult.data]);

  useEffect(() => {
    if (requests.data) {
      setRequestResultset(requests.data);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [requests.data]);

  if (loading) return <LoadingSpinner message="Loading report details..." />;

  return (
    <View style={homeStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.scrollContent}
      >
        {cacheProgressReport.length > 0 && (
          <ProgressReportCardHorizontal
            progressReportCache={cacheProgressReport}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        )}

        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        )}

        <View style={homeStyles.recipesSection}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>{selectedCategoryText}</Text>
          </View>

          {requestResultset.length > 0 ? (
            <FlatList
              data={requestResultset}
              renderItem={({ item }) => (
                <RequestByStatusCard requestResultSet={item} />
              )}
              keyExtractor={(item) => item.Id.toString()}
              numColumns={2}
              columnWrapperStyle={homeStyles.row}
              contentContainerStyle={homeStyles.recipesGrid}
              scrollEnabled={false}
              // ListEmptyComponent={}
            />
          ) : (
            <View style={homeStyles.emptyState}>
              <Ionicons
                name="home-outline"
                size={64}
                color={COLORS.textLight}
              />
              <Text style={homeStyles.emptyTitle}>No request found</Text>
              <Text style={homeStyles.emptyDescription}>
                Try a different category
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;
