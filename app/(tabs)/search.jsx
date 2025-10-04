import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { searchStyles } from "../../assets/styles/search.styles";
import LoadingSpinner from "../../components/LoadingSpinner";
import SearchCard from "../../components/SearchCard";
import { COLORS } from "../../constants/colors";
import { useDebounce } from "../../hooks/useDebounce";
import { AuthContext } from "../../utils/authContext";
import { SearchDataAPI } from "../hooks/SearchHook";
const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultSet, setSearchResultSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const performSearch = async (query) => {
    // if no search query
    let canExecute = false;
    if (!query.trim() || query.trim().length > 4) {
      canExecute = true;
    }

    if (canExecute) {
      const randomMeals = await SearchDataAPI.getRandomMeals(
        authContext.userToken,
        query.trim()
      );
      return randomMeals;
    }

    return [];
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const results = await performSearch("");
        setSearchResultSet(results);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (initialLoading) return;

    const handleSearch = async () => {
      setLoading(true);

      try {
        const results = await performSearch(debouncedSearchQuery);
        setSearchResultSet(results);
      } catch (error) {
        console.error("Error searching:", error);
        setSearchResultSet([]);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [debouncedSearchQuery, initialLoading]);

  if (initialLoading) return <LoadingSpinner message="Loading results..." />;

  return (
    <View style={searchStyles.container}>
      <View style={searchStyles.searchSection}>
        <View style={searchStyles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.textLight}
            style={searchStyles.searchIcon}
          />
          <TextInput
            style={searchStyles.searchInput}
            placeholder="Search projects, requests..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={searchStyles.clearButton}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={searchStyles.resultsSection}>
        <View style={searchStyles.resultsHeader}>
          <Text style={searchStyles.resultsTitle}>
            {searchQuery ? `Results for "${searchQuery}"` : "Latest Search"}
          </Text>
          <Text style={searchStyles.resultsCount}>
            {searchResultSet.length} found
          </Text>
        </View>

        {loading ? (
          <View style={searchStyles.loadingContainer}>
            <LoadingSpinner message="Searching IPIS..." size="small" />
          </View>
        ) : (
          <FlatList
            data={searchResultSet}
            renderItem={({ item }) => <SearchCard recipe={item} />}
            keyExtractor={(item) => item.Discriminator.toString()}
            numColumns={2}
            columnWrapperStyle={searchStyles.row}
            contentContainerStyle={searchStyles.recipesGrid}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NoResultsFound />}
          />
        )}
      </View>
    </View>
  );
};
export default SearchScreen;

function NoResultsFound() {
  return (
    <View style={searchStyles.emptyState}>
      <Ionicons name="search-outline" size={64} color={COLORS.textLight} />
      <Text style={searchStyles.emptyTitle}>No results found</Text>
      <Text style={searchStyles.emptyDescription}>
        Try adjusting your search or try different keywords
      </Text>
    </View>
  );
}
