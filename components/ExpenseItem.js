import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { getFormattedDate, getormatedDate } from "../util/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ dataItem, index }) {
  const navigation = useNavigation();

  function handlePressNavigate() {
    navigation.navigate("ManageExpenses", {
      expenseId: dataItem.id,
      index: index,
    });
  }
  return (
    <Pressable
      onPress={handlePressNavigate}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={styles.expenseDesc}>{dataItem.description}</Text>
          <Text style={styles.expenseDate}>
            {getFormattedDate(dataItem.date)}
          </Text>
        </View>
        <View style={styles.expenseAmountContainer}>
          <Text style={styles.expenseAmount}>{dataItem.amount}</Text>
          {/* to Fixed(2)*/}
        </View>
      </View>
    </Pressable>
  );
}
export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: GlobalStyles.colors.primary400,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    marginVertical: 7,
  },
  expenseDesc: {
    color: "white",
    fontSize: 16,
  },
  expenseDate: {
    color: "white",
    fontSize: 12,
  },

  expenseAmount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  expenseAmountContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    width: 60,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  pressedItem:{
    opacity:0.75
  }
});
