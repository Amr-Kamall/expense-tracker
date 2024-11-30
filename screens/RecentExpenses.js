import { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { useExpense } from "../store/ExpenseContext";
import { getDateMinutesDay } from "../util/date";
import { fetchData } from "../util/http";

function RecentExpenses() {
  const { expenses } = useExpense();

  // filter the recent expenses
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinutesDay(today, 7);
    const expenseDate = new Date(expense.date);
    return expenseDate > date7DaysAgo;
  });
  console.log("recent expenses:", recentExpenses.length);

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="last 7 days" />
  );
}

export default RecentExpenses;
