import ExpensesOutput from "../components/ExpensesOutput";
import ErrorLayout from "../components/ui/ErrorLayout";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useExpense } from "../store/ExpenseContext";

function AllExpenses() {
  const { expenses, loading, error } = useExpense();
  if (loading) {
    return <LoadingSpinner size="large" />;
  }
  if(error){
    return <ErrorLayout message={error} />
  }

  return <ExpensesOutput expenses={expenses} expensesPeriod="Total" />;
}

export default AllExpenses;
