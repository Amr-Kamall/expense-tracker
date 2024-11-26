import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
function ExpensesSummary({ expensesPeriod, expenses }) {
  const sumExpensesAmount = expenses.reduce(
    (acc, currentExpense) => acc + currentExpense.amount,
    0
  );
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryPeriod}>{expensesPeriod}</Text>
      <Text style={styles.summaryAmount}>${sumExpensesAmount}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  summaryPeriod: {
    fontSize: 14,
    color: GlobalStyles.colors.primary700,
  },
  summaryAmount: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary800,
    fontSize: 18,
  },
});
