import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { Icon } from "react-native-elements";
import Screen from "../../components/screen";
import Button from "../../components/button";
import CustomPicker from "../../components/custom.picker";
import Label from "../../components/label";
import Error from "../../components/error";
import { getToken } from "../../domain/actions/token.action";
import { updateVAccount } from "../../domain/actions/createVA.action";

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
  const preferences = useSelector((store) => store.userPreference.preferences);
  const { account } = preferences;
  const balanceAmount = account.rewardAmount || 0;
  const balancePoints = account.rewardPts || 0;
  const [creditAccount, setCreditAccount] = useState();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);

  const onTextChanged = (value) => {
    if (value > balanceAmount) {
      setError(true)
    } else {
      setError(false)
    }
    setAmount(value)
  }
  
  const makeTrasfer = () => {
    const updatedRewards = {
      ...preferences,
      account: {
        rewardPts: preferences.account.rewardPts - amount * 0.02,
        rewardAmount: preferences.account.rewardAmount - amount,
      },
    };
    dispatch(updateVAccount(updatedRewards));
    navigation.navigate("dashbaord");
  }

  return (
    <Screen style={styles.container}>
      <Label text={`Available Reward Account Balance: ${balanceAmount}`} />
      <Label text={`Total Reward Points: ${balancePoints}`} />
      <Image
        style={styles.rewardImage}
        source={require("../../../assets/level3.png")}
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
          onChangeText={onTextChanged}
        />
      </View>
      <Text style={styles.labeltext}>
        You will lose {amount * 0.02} Reward Points for this transfer and your
        badge may change
      </Text>
      <Error
        visible={error}
        message={`Entered Amount ${amount}, Exceeds your available balance`}
      />
      <Button
      disable={error}
        title="Transfer"
        style={{ marginBottom: 10 }}
        onPress={() => {
          makeTrasfer()
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
    paddingTop: 20,
  },
  labeltext: {
    textAlign: "left",
    fontSize: 16,
    paddingTop: 20,
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
    width: "40%",
    height: "20%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  error: {
    color: '#ff0000',
    paddingTop: 10,
  }
});

export default TransferToSavings;
