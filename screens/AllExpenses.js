import ExpensesOutput from "../components/ExpensesOutput";
import { useExpense } from "../store/ExpenseContext";

function AllExpenses() {
  const { expenses } = useExpense();
  return <ExpensesOutput expenses={expenses} expensesPeriod="Total" />;
}

export default AllExpenses;
