import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item, index }) => <ExpenseItem dataItem={item} index={index} />}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
