import React from "react";
import { SafeAreaView, StyleSheet, View, ImageBackground } from "react-native";
import Constants from "expo-constants";
import Loader from "./loader";

const Screen = ({ children, style, showLoader }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <Loader loading={showLoader}>
        <ImageBackground
          source={require("../../assets/happysave-opacity-10.png")}
          style={styles.image}
        >
          <View style={[styles.container, style]}>{children}</View>
        </ImageBackground>
      </Loader>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignContent: "center",
    justifyContent: "center",
  },
});

export default Screen;
