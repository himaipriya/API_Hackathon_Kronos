import React from "react";
import { StyleSheet, Text } from "react-native";

const Label = ({ text, style }) => {
  return <Text style={[styles.label, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
    paddingVertical: 10,
  },
});

export default Label;
