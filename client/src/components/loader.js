import React from "react";
import { ActivityIndicator, View, StyleSheet, Platform } from "react-native";

const Loader = ({ children, loading = false }) => {
  return (
    <>
      {loading && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#f4511e" />
        </View>
      )}
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "whitesmoke",
    ...Platform.select({
      ios: {
        zIndex: 1,
      },
      android: {
        elevation: 0.1,
      },
      default: {
        zIndex: 1,
      },
    }),
  },
});

export default Loader;
