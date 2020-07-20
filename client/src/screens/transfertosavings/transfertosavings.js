import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { Icon } from 'react-native-elements'
import Screen from "../../components/screen";
import Button from "../../components/button";
import CustomPicker from "../../components/custom.picker";
import Label from "../../components/label";
import { getToken } from "../../domain/actions/token.action";

const accounts = [
  {
    number: 20457867,
    name: "ABC industries Ltd",
  },
  {
    number: 20587068,
    name: "Amazon pay",
  },
  {
    number: 28473844,
    name: "XYZ Personal Account",
  },
];

const TransferToSavings = ({ navigation }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((store) => store.token.userAuthenticated);
  const payments = useSelector((store) => store.makePayment.payments);
  const balAmount = (accumulator, currentValue) => (Number(accumulator) + Number(currentValue.rewardAmount));
  const balPoints = (accumulator, currentValue) => (Number(accumulator) + Number(currentValue.rewardPts));
  const balanceAmount = payments.reduce(balAmount, 0)
  const balancePoints = payments.reduce(balPoints, 0)
  const [creditAccount, setCreditAccount] = useState();
  const [amount, setAmount] = useState("");

  useEffect(() => {
    //dispatch(getToken());
  }, []);

  useEffect(() => {
    // console.log("useEffect", authenticated);
  }, [authenticated]);

  return (
    <Screen style={styles.container}>
      <Label text={`Available Reward Account Balance: ${balanceAmount}`}/>
      <Label text={`Total Reward Points: ${balancePoints}`}/>
       <Image
          style={styles.rewardImage}
          source={require('../../../assets/level3.png')}
        />
      <Text style={styles.labeltext}>Select the Credit account:</Text>
      <CustomPicker
        data={accounts}
        selectedItem={creditAccount}
        displayField="number"
        keyField="number"
        onSelect={setCreditAccount}
        placeholder="Select an account"
      />
      <View style={styles.amtContainer}>
        <Label text="WithDraw Amount" />
        <TextInput
            keyboardType="number-pad"
            placeholder="Amount"
            maxLength={10}
            style={styles.amtField}
            value={amount}
            onChangeText={setAmount}
          />
      </View>
      <Text style={styles.labeltext}>You will lose {amount * 0.01} Reward Points for this transfer and your badge may change</Text>
      <Button
        title="Transfer"
        style={{ marginBottom: 10 }}
        onPress={() => {
          // navigation.navigate("fdpage");
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
    textAlign: "left",
    fontSize: 16,
    paddingTop: 20
  },
  amtContainer: {
    marginVertical: 20,
    flexDirection: "row",
  },
  amtField: {
    flex: 0.5,
    borderColor: "#000",
    borderWidth: 1,
    marginLeft: 15,
    borderRadius: 5,
    paddingLeft: 15,
  },
  rewardImage: {
    width: '40%',
    height: '20%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

export default TransferToSavings;