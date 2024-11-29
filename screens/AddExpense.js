import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/manageExpense/ExpensForm";

function AddExpense({ navigation }) {
  function goBack() {
    navigation.goBack(); //go back to the screen that open this screen
  }

  return (
    <View style={styles.AddExpenseScreenContainer}>
      <ExpenseForm goBack={goBack} navigation={navigation} />
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
