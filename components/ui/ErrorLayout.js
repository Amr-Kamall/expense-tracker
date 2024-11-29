import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ErrorLayout({ message }) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorMessage}>{message}</Text>
      <Text style={styles.subErrorMessage}>couldn't fetch expense</Text>
    </View>
  );
}

export default ErrorLayout;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary500,
    gap: 10,
  },
  errorMessage: {
    fontWeight: "500",
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  subErrorMessage: {
    textAlign: "center",
    color: "white",
  },
});
