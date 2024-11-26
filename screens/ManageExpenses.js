import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";
import { useExpense } from "../store/ExpenseContext";
import { getFormattedDate } from "../util/date";
import ExpenseForm from "../components/manageExpense/ExpensForm";

function ManageExpenses({ route, navigation }) {
  const selectedId = route.params?.expenseId;

  const { handleRemoveExpense, expenses, setExpenses } = useExpense();

  // useEffect(() => {
  //   if (selectedExpense) {
  //     setAmount(selectedExpense.amount.toString()); // Convert to string for TextInput
  //     setDate(getFormattedDate(selectedExpense.date)); // Adjust date format if needed
  //     setDescription(selectedExpense.description);
  //   }
  // }, [selectedExpense]);

  const selectedIndex = route.params.index;
  const selectedExpense = expenses[selectedIndex];

  function updateExpense() {
    const newExpenses = [...expenses];
    const newExpenseObj = {
      amount: amount,
      date: new Date(date),
      description: description,
    };
    newExpenses[selectedIndex] = newExpenseObj;
    setExpenses(newExpenses);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack(); //go back to the screen that open this screen
  }
  function deleteHandler() {
    handleRemoveExpense(selectedId);
    navigation.goBack(); //go back to the screen that open this screen
  }

  return (
    <View style={styles.outerButtonContainer}>
      <ExpenseForm
        cancelHandler={cancelHandler}
        selectedId={selectedId}
        selectedIndex={selectedIndex}
      />
      <View style={styles.innerButtonContainer}>
        <IconButton
          icon="trash"
          size={36}
          color={GlobalStyles.colors.error500}
          onPress={deleteHandler}
        />
      </View>
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  outerButtonContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    paddingHorizontal: 20,
  },
  innerButtonContainer: {
    marginTop: 15,
    borderTopColor: GlobalStyles.colors.primary50,
    borderTopWidth: 2,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  additionalStyles: {
    minWidth: 120,
    marginHorizontal: 10,
  },
  expenseText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    marginVertical: 15,
  },
  input: {
    backgroundColor: "white",
    marginVertical: 20,
    padding: 20,
  },
});
