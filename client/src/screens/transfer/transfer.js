import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text } from "react-native";
import { Icon } from 'react-native-elements'
import Screen from "../../components/screen";
import MyCarousel  from "../../components/carousel/mycarousel"
import Button from "../../components/button";
import { getToken } from "../../domain/actions/token.action";

const Transfer = ({ navigation }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((store) => store.token.userAuthenticated);

  useEffect(() => {
    //dispatch(getToken());
  }, []);

  useEffect(() => {
    // console.log("useEffect", authenticated);
  }, [authenticated]);

  const onOfferSelected = (data) => {
    console.log('On OFFER', data)
    navigation.navigate("offer-creation", {...data});
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.text}>You can choose a below Product </Text>
      <MyCarousel
        whenClicked={onOfferSelected}></MyCarousel>
      <Button
        title="Create Fixed Deposit"
        style={{ marginBottom: 10 }}
        onPress={() => {
          navigation.navigate("create-fd");
        }}
      />
      <Button
        title="Transfer to Savings Account"
        style={{ marginBottom: 10 }}
        onPress={() => {
          navigation.navigate("transfer-to-savings");
        }}
      />
      <Button
        title="Delete Virtual Account"
        style={{ marginBottom: 10 }}
        onPress={() => {
          navigation.navigate("transfer-to-savings");
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
    fontSize: 24
  },
});

export default Transfer;
