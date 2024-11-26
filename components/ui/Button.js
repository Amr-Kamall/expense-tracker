import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({ children, mode, onPress,additionalStyles }) {
  return (
    <View style={additionalStyles}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressedButton}
      >
        <View
          style={[styles.innerButton, mode === "flat" && styles.flatButton]}
        >
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  innerButton: {
    backgroundColor: GlobalStyles.colors.primary500,
    paddingVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  flatButton: {
    backgroundColor: "transparent",
  },
  pressedButton: {
    opacity: 0.75,
  },
});
