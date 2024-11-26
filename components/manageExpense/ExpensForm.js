import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useExpense } from "../../store/ExpenseContext";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({ cancelHandler, selectedIndex }) {
  const { handleAddExpense, expenses, setExpenses } = useExpense();

  //   essential functions >>
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  function inputChangeHandler(inputIdentefier, enteredValue) {
    setInputValues((currentInpValues) => {
      return { ...currentInpValues, [inputIdentefier]: enteredValue };
    });
  }

  //updating
  const selectedExpense = expenses[selectedIndex];
  const inUpdatedMood = !!selectedExpense;

  console.log(inUpdatedMood); //get me false after i updated the expense item and click on it agian

  useEffect(() => {
    if (selectedExpense) {
      setInputValues({
        amount: selectedExpense.amount.toString(), // Convert to string for TextInput
        date: getFormattedDate(selectedExpense.date), // Format the date
        description: selectedExpense.description, // Update description
      });
    }
  }, [selectedExpense]);

  function updateExpense() {
    const newExpenses = [...expenses];
    const newExpenseObj = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    newExpenses[selectedIndex] = newExpenseObj;
    setExpenses(newExpenses);
    cancelHandler();
  }

  //adding
  function confirmHandler() {
    const newExpense = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date), //we should make it like an object
      description: inputValues.description,
      id: Date.now(),
    };
    // handle add expense here with newExpense as parameter
    handleAddExpense(newExpense);
    cancelHandler();
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.rowInputs}>
        <Input
          style={styles.inputRow}
          label="amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.inputRow}
          label="date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="description"
        textInputConfig={{
          multiline: true,
          value: inputValues.description,
          onChangeText: inputChangeHandler.bind(this, "description"),
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          additionalStyles={styles.additionalStyles}
          mode="flat"
          onPress={cancelHandler}
        >
          cancel
        </Button>
        <Button
          additionalStyles={styles.additionalStyles}
          onPress={inUpdatedMood ? updateExpense : confirmHandler}
        >
          {inUpdatedMood ? "edit" : "add"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 70,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
    fontWeight: 500,
    marginVertical: 20,
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputRow: {
    flex: 1,
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
});
