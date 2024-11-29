import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../util/http";

const ExpenseContext = createContext();

function ExpenseProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expenses, setExpenses] = useState([]);
  console.log("with id please", expenses); //with id please [{"amount": 22, "date": 2970-01-01T00:00:00.000Z, "description": "Check "}]
  console.log(error);
  //get expenses from firebase with help of fetchData() util function
  useEffect(() => {
    async function getExpenses() {
      try {
        setLoading(true);
        const expenses = await fetchData();
        setExpenses(expenses);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("An Error Occurred!");
      }
    }
    getExpenses();
  }, []);

  // console.log("Current fetchedExpenses state amoory:", expenses);

  function handleRemoveExpense(selectedId) {
    setExpenses((expenses) =>
      expenses.filter((expense) => expense.id !== selectedId)
    );
  }

  function handleAddExpense(newExpense) {
    setExpenses((oldExpenses) => [...oldExpenses, newExpense]);
  }

  // still func of updateing (take the idea from naga project product builder)

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        handleRemoveExpense,
        handleAddExpense,
        loading,
        setExpenses,
        error,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

function useExpense() {
  const context = useContext(ExpenseContext);
  if (context === undefined)
    throw new Error("Expenses context was used outside the ExpensesProvider ");
  return context;
}

export { useExpense, ExpenseProvider };
