import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { DataTable } from "react-native-paper";
import { NumericFormat } from "react-number-format";
import { recipeDetailStyles } from "../assets/styles/recipe-detail.styles";
import { COLORS } from "../constants/colors";

export default function WeeklyProgressMilestoneCard({ weeklyProgressCache }) {
  const barData = [];

  weeklyProgressCache.MilestoneResultSet.map((item) =>
    barData.push({
      value: item.UnitCount,
      label: item.MilestoneDefinition,
      labelWidth: 70,
      topLabelComponent: () => (
        <Text style={{ color: "blue", fontSize: 13, marginBottom: 6 }}>
          {item.UnitCount}
        </Text>
      ),
    })
  );

  return (
    <View style={recipeDetailStyles.sectionContainer}>
      <View style={recipeDetailStyles.sectionTitleRow}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primary + "80"]}
          style={recipeDetailStyles.sectionIcon}
        >
          <Ionicons name="list" size={16} color={COLORS.white} />
        </LinearGradient>
        <Text style={recipeDetailStyles.sectionTitle}>Milestones</Text>
        <View style={recipeDetailStyles.countBadge}>
          <Text style={recipeDetailStyles.countText}>
            {weeklyProgressCache.MilestoneResultSet.length}
          </Text>
        </View>
      </View>
      <View style={recipeDetailStyles.ingredientCard}>
        <BarChart
          horizontal
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          frontColor="#177AD5"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          isThreeD
        />
      </View>
      <View style={recipeDetailStyles.ingredientCard}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Milestone</DataTable.Title>
            <DataTable.Title numeric>UnitCount</DataTable.Title>
            <DataTable.Title numeric>Current Claim</DataTable.Title>
            <DataTable.Title numeric>Total Claim</DataTable.Title>
            <DataTable.Title numeric>Balance</DataTable.Title>
          </DataTable.Header>

          {weeklyProgressCache.MilestoneResultSet.map((item) => (
            <DataTable.Row key={item.MilestoneOrdinal}>
              <DataTable.Cell>{item.MilestoneDefinition}</DataTable.Cell>
              <DataTable.Cell numeric>{item.UnitCount}</DataTable.Cell>
              <DataTable.Cell numeric>
                <NumericFormat
                  displayType={"text"}
                  value={item.CurrentClaim}
                  prefix={"R"}
                  decimalScale={2}
                  thousandSeparator=","
                />
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <NumericFormat
                  displayType={"text"}
                  value={item.TotalClaimed}
                  prefix={"R"}
                  decimalScale={2}
                  thousandSeparator=","
                />
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {" "}
                <NumericFormat
                  displayType={"text"}
                  value={item.BalanceClaim}
                  prefix={"R"}
                  decimalScale={2}
                  thousandSeparator=","
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
}
