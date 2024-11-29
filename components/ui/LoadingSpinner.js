import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function LoadingSpinner({ size }) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={size} color="white" />
    </View>
  );
}

export default LoadingSpinner;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
