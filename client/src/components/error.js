import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Error = ({ visible, message }) => {
  return (
    <>
      {visible && (
        <View style={styles.container}>
          <MaterialIcons name="error" size={24} color="red" />
          <Text style={styles.errorTxt}>{message}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorTxt: {
    color: "red",
    marginLeft: 5,
    fontWeight: "500",
  },
});

export default Error;
