import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useExpense } from "../../store/ExpenseContext";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { editExpense, storeData } from "../../util/http";
import LoadingSpinner from "../ui/LoadingSpinner";

function ExpenseForm({ goBack, selectedIndex }) {
  const { handleAddExpense, expenses, setExpenses, error } = useExpense();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (inputValues.date.trim().length === 0) {
      validationErrors.date = "Please enter a valid dateeee";
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

    // Update the selected expense while retaining its index
    const updatedExpenses = expenses.map((expense, index) =>
      index === selectedIndex
        ? {
            ...expense, // Retain existing fields
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description,
          }
        : expense
    );
    //for send edit to firebase
    const updatedExpense = updatedExpenses[selectedIndex];
    editExpense(updatedExpense.id, updatedExpense);
    setExpenses(updatedExpenses);
    goBack();
  }

  //    -------------------------- adding -------------------------
  async function confirmHandler() {
    if (!validateInputs()) {
      return;
    }

    const newExpense = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    try {
      // Save the new expense in Firebase and get the ID
      setIsSubmitting(true);
      const response = await storeData(newExpense);
      const id = response.data.name; // Firebase returns the generated ID as `name`
      const newExpenseWithId = { ...newExpense, id }; // Add the Firebase-generated ID
      setIsSubmitting(false);

      handleAddExpense(newExpenseWithId); // Add to the context with the ID
      goBack();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
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
          {inUpdatedMood ? (
            "Edit"
          ) : isSubmitting ? (
            <LoadingSpinner size="small" />
          ) : (
            "Add"
          )}
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
    marginLeft: 8,
  },
});
