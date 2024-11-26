import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "first description",
    date: new Date("2024-11-20"),
    amount: 20,
  },
  {
    id: "e2",
    description: "second description",
    date: new Date("2024-11-23"),
    amount: 28,
  },
  {
    id: "e3",
    description: "third description",
    date: new Date("2024-1-28"),
    amount: 10,
  },
  {
    id: "e4",
    description: "fourth description",
    date: new Date("2024-1-29"),
    amount: 9.2,
  },
  {
    id: "e5",
    description: "fifth description",
    date: new Date("2024-1-18"),
    amount: 99.2,
  },
  {
    id: "e6",
    description: "six description",
    date: new Date("2024-1-15"),
    amount: 12.2,
  },
];

function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

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
      value={{ expenses, handleRemoveExpense, handleAddExpense, setExpenses }}
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
