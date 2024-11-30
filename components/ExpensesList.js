import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <ExpenseItem dataItem={item} />}
      keyExtractor={(item) => item.description}
    />
  );
}

export default ExpensesList;
