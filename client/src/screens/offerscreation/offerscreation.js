import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, Image } from "react-native";
import Screen from "../../components/screen";
import Button from "../../components/button";
import { getToken } from "../../domain/actions/token.action";

const OffersCreation = ({ route, navigation }) => {
   const { title, subtitle, illustration } = route.params;
  const dispatch = useDispatch();
  const authenticated = useSelector((store) => store.token.userAuthenticated);

  useEffect(() => {
    // console.log("useEffect", authenticated);
  }, [authenticated]);

  return (
    <Screen style={styles.container}>
      {/* <Text style={styles.text}>Selected Offer:</Text> */}
      <Text style={styles.labeltext}>{title}</Text>
      <Image
          style={styles.rewardImage}
          source={{
            uri: illustration,
        }}
        />
      <Button
        title="I'm Intrested"
        style={{ marginBottom: 10 }}
        onPress={() => {
          navigation.navigate("dashbaord");
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: "left",
    fontSize: 24,
    paddingTop: 20
  },
  labeltext: {
    textAlign: "center",
    fontSize: 16,
    paddingTop: 20
  },
  rewardImage: {
    paddingTop: 20,
    width: '90%',
    height: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

});

export default OffersCreation;
