import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useExpense } from "../../store/ExpenseContext";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ goBack, selectedIndex }) {
  const { handleAddExpense, expenses, setExpenses } = useExpense();

  // essential
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((currentInputValues) => ({
      ...currentInputValues,
      [inputIdentifier]: enteredValue,
    }));
  }

  //   ------------------ validation -------------------
  const [errors, setErrors] = useState({
    amount: "",
    date: "",
    description: "",
  });

  function validateInputs() {
    const validationErrors = {};

    if (isNaN(+inputValues.amount) || +inputValues.amount <= 0) {
      validationErrors.amount = "Please enter a valid amount greater than 0.";
    }

    if (
      inputValues.date.trim().length === 0 ||
      isNaN(new Date(inputValues.date).getTime())
    ) {
      validationErrors.date = "Please enter a valid date";
    }

    if (inputValues.description.trim().length === 0) {
      validationErrors.description = "Description cannot be empty.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; //means that there is a value in this object
  }

  //   ------------------- updating ------------------------
  const selectedExpense = expenses[selectedIndex];
  const inUpdatedMood = !!selectedExpense;

  useEffect(() => {
    if (selectedExpense) {
      setInputValues({
        amount: selectedExpense.amount.toString(),
        date: getFormattedDate(selectedExpense.date),
        description: selectedExpense.description,
      });
    }
  }, [selectedExpense]);

  function updateExpense() {
    if (!validateInputs()) {
      return;
    }

    const updatedExpenses = [...expenses];
    updatedExpenses[selectedIndex] = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
      id: Date.now(),
    };

    setExpenses(updatedExpenses);
    goBack();
  }

  //    -------------------------- adding -------------------------
  function confirmHandler() {
    if (!validateInputs()) {
      return;
    }

    const newExpense = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
      id: Date.now(),
    };

    handleAddExpense(newExpense);
    goBack();
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.rowInputs}>
        <View style={styles.inputWrapper}>
          <Input
            style={styles.inputRow}
            label="Amount"
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangeHandler.bind(this, "amount"),
              value: inputValues.amount,
            }}
          />
          {errors.amount ? (
            <Text style={styles.errorText}>{errors.amount}</Text>
          ) : null}
        </View>
        <View style={styles.inputWrapper}>
          <Input
            style={styles.inputRow}
            label="Date"
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangeHandler.bind(this, "date"),
              value: inputValues.date,
            }}
          />
          {errors.date ? (
            <Text style={styles.errorText}>{errors.date}</Text>
          ) : null}
        </View>
      </View>
      <View>
        <Input
          label="Description"
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, "description"),
            value: inputValues.description,
          }}
        />
        {errors.description ? (
          <Text style={styles.errorText}>{errors.description}</Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          additionalStyles={styles.additionalStyles}
          mode="flat"
          onPress={goBack}
        >
          Cancel
        </Button>
        <Button
          additionalStyles={styles.additionalStyles}
          onPress={inUpdatedMood ? updateExpense : confirmHandler}
        >
          {inUpdatedMood ? "Edit" : "Add"}
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
    fontWeight: "500",
    marginVertical: 20,
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputWrapper: {
    flex: 1,
    marginBottom: 10,
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
  errorText: {
    color: GlobalStyles.colors.error500,
    fontSize: 12,
    marginLeft:8,
  },
});
