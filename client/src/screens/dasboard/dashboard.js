import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Text, Image } from "react-native";
import Screen from "../../components/screen";
import Button from "../../components/button";
import { getToken } from "../../domain/actions/token.action";
import { getPreference } from "../../domain/actions/preferences.action";

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((store) => store.token.userAuthenticated);

  useEffect(() => {
    dispatch(getToken());
    dispatch(getPreference());
  }, []);

  useEffect(() => {
    if (authenticated) {
      // navigation.navigate("settings");
    }
  }, [authenticated]);

  return (
    <Screen style={styles.container}>
      <Text style={styles.text}>
        Level up yourself on every transaction and accumulate reward points for
        exciting offers tailored specially for yourself
      </Text>
      <Image
        style={styles.rewardImage}
        source={require("../../../assets/level1.png")}
      />
      <Image
        style={styles.rewardImage}
        source={require("../../../assets/level6.png")}
      />
      <Image
        style={styles.rewardImage}
        source={require("../../../assets/level9.png")}
      />
      <Button
        title="Virtual Account Settings"
        style={{ marginBottom: 10 }}
        onPress={() => {
          navigation.navigate("settings");
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "left",
  },
  rewardImage: {
    width: "40%",
    height: "20%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default Settings;
