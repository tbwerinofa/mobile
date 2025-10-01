import { View } from "react-native";
import { DataTable } from "react-native-paper";
import { recipeDetailStyles } from "../assets/styles/recipe-detail.styles";

export default function WeeklyProgressMilestoneCard({ residentialUnitCache }) {
  const barData = [];

  return (
    <View style={recipeDetailStyles.sectionContainer}>
      <View style={recipeDetailStyles.ingredientCard}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Side No.</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Passed</DataTable.Title>
          </DataTable.Header>

          {residentialUnitCache.ChildList.map((item) => (
            <DataTable.Row key={item.Id}>
              <DataTable.Cell>{item.Name}</DataTable.Cell>
              <DataTable.Cell>{item.Status}</DataTable.Cell>
              <DataTable.Cell>{item.HasPassed ? "yes" : "No"}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
}
