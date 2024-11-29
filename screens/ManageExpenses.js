import { StyleSheet, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useExpense } from "../store/ExpenseContext";
import ExpenseForm from "../components/manageExpense/ExpensForm";
import { deleteExpense } from "../util/http";

function ManageExpenses({ route, navigation }) {
  const selectedId = route.params?.expenseId;

  const { handleRemoveExpense } = useExpense();
  const selectedIndex = route.params.index;

  function goBackHandler() {
    navigation.goBack(); //go back to the screen that open this screen
  }
  function deleteHandler() {
    console.log(selectedId);
    handleRemoveExpense(selectedId);
    deleteExpense(selectedId);
    navigation.goBack(); //go back to the screen that open this screen
  }

  return (
    <View style={styles.outerButtonContainer}>
      <ExpenseForm goBack={goBackHandler} selectedIndex={selectedIndex} />
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
