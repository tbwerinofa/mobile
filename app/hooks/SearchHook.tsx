import config from "../../utils/config";

export const SearchDataAPI = {
  FetchResults: async (token: string, query: string) => {
    try {
      const response = await fetch(`${config.baseApiUrl}/api/search/${query}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting random search:", error);
      return null;
    }
  },

  // get multiple random meals
  getRandomMeals: async (token: string, query: string) => {
    try {
      const promises = await SearchDataAPI.FetchResults(token, query);
      const meals = await Promise.all(promises);
      return meals.filter((meal) => meal !== null);
    } catch (error) {
      console.error("Error getting random meals:", error);
      return [];
    }
  },
};
