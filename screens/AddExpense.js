import { useState } from "react";
import { useExpense } from "../store/ExpenseContext";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../components/ui/Button";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/manageExpense/ExpensForm";
import Input from "../components/manageExpense/Input";

function AddExpense({ navigation }) {
  function cancelHandler() {
    navigation.goBack(); //go back to the screen that open this screen
  }

  return (
    <View style={styles.AddExpenseScreenContainer}>
      <ExpenseForm cancelHandler={cancelHandler} navigation={navigation} />
    </View>
  );
}

export default AddExpense;

const styles = StyleSheet.create({
  AddExpenseScreenContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    paddingHorizontal: 20,
  },
});
