import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../constants/styles";

function ExpensesOutput({ expenses, expensesPeriod }) {
  if (expenses.length > 0) {
    return (
      <View style={styles.expensesOutputContainer}>
        <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
        <ExpensesList expenses={expenses} />
      </View>
    );
  } else {
    return (
      <View style={styles.expensesOutputContainer}>
        <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
        <Text style={styles.notFound}>
          {expensesPeriod === "Total"
            ? "No registered expenses found"
            : "No Expenses registered for the last 7 days"}
        </Text>
      </View>
    );
  }
}
export default ExpensesOutput;

const styles = StyleSheet.create({
  expensesOutputContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
    flex: 1,
    paddingHorizontal: 20,
  },
  notFound: {
    color: "white",
    textAlign: "center",
    paddingVertical: 30,
  },
});
