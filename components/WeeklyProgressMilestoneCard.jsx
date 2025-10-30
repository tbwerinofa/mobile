import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { DataTable } from "react-native-paper";
import { NumericFormat } from "react-number-format";
import { recipeDetailStyles } from "../assets/styles/recipe-detail.styles";

export default function WeeklyProgressMilestoneCard({ weeklyProgressCache }) {
  const barData = [];

  weeklyProgressCache.MilestoneResultSet.map((item) =>
    barData.push({
      value: item.UnitCount,
      label: item.MilestoneDefinition,
      topLabelComponent: () => (
        <Text style={{ color: "blue", fontSize: 13, marginBottom: 6 }}>
          {item.UnitCount}
        </Text>
      ),
    })
  );

  return (
    <View style={recipeDetailStyles.sectionContainer}>
      <View style={recipeDetailStyles.ingredientCard}>
        <LinearGradient style={{ flex: 1 }} colors={["#000000", "#FFFFFF"]}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <BarChart
              frontColor={"blue"}
              gradientColor={"red"}
              data={barData}
              showGradient
              noOfSections={4}
              barBorderRadius={4}
              yAxisThickness={0}
              xAxisThickness={0}
              onPress={() => {}}
              yAxisLabelTextStyle={{
                color: "gray",
                fontSize: 12,
                fontWeight: "500",
              }}
              xAxisLabelTextStyle={{
                color: "gray",
                fontSize: 12,
                fontWeight: "500",
              }}
              dashGap={10}
              showXAxisIndices={false}
            />
          </ScrollView>
        </LinearGradient>
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
