import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Colors from "../specifics/colors";

const Button = ({ title, onPress, type = "primary", style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[type] }, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  text: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default Button;
