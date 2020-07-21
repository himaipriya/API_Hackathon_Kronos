import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, TextInput, Image, FlatList } from "react-native";
import Screen from "../../components/screen";
import Button from "../../components/button";
import Error from "../../components/error";

import CustomPicker from "../../components/custom.picker";
import Label from "../../components/label";
import { updateVAccount } from "../../domain/actions/createVA.action";
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

const initTenure = {
  number: 0,
  name: "",
  reward: 0
}
const tenure = [
  {
    number: 1,
    name: "ABC industries Ltd",
    reward: 0.01,
    badge: require('../../../assets/level3.png')
  },
  {
    number: 2,
    name: "Amazon pay",
    reward: 0.02,
    badge: require('../../../assets/level4.png')
  },
  {
    number: 3,
    name: "XYZ Personal Account",
    reward: 0.03,
    badge: require('../../../assets/level5.png')
  },
];

const DATA = [
  {
    id: 1,
    amount: 100,
    reward: 8,
    date: "12/5/2020",
  },
  {
    id: 2,
    amount: 300,
    reward: 20,
    date: "12/5/2020",
  },
  {
    id: 3,
    amount: 1000,
    reward: 32,
    date: "12/5/2020",
  },
  {
    id: 4,
    amount: 50000,
    reward: 200,
    date: "12/5/2020",
  },
  {
    id: 5,
    amount: 10000,
    reward: 80,
    date: "12/5/2020",
  },
];


const TransferAsFixedDeposit = ({ navigation }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((store) => store.token.userAuthenticated);
  const preferences = useSelector((store) => store.userPreference.preferences);
  const { account } = preferences;
  const balanceAmount = account.rewardAmount || 0;
  const balancePoints = account.rewardPts || 0;

  const [selectedTenure, setTenure] = useState(initTenure);
  const [tenureSelected, setTenureSelected] = useState(false);
  const [badgeSource, setBadgeSource] = useState('')

  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  
  useEffect(() => {
    //dispatch(getToken());
  }, []);

  useEffect(() => {
    if(selectedTenure && selectedTenure.number !== 0){
      setBadgeSource(selectedTenure.badge)
      setTenureSelected(true)
    } else {
      setBadgeSource('')
      setTenureSelected(false)
    }
  }, [selectedTenure]);

  useEffect(() => {
    // console.log("useEffect", authenticated);
  }, [authenticated]);

  const onTextChanged = (value) => {
    if (value > balanceAmount) {
      setError(true)
    } else {
      setError(false)
    }
    setAmount(value)
  }

  const createFixedDeposit = () => {
    const updatedRewards = {
      ...preferences,
      account: {
        rewardPts: preferences.account.rewardPts + amount * selectedTenure.reward,
        rewardAmount: preferences.account.rewardAmount - amount,
      },
    };
    dispatch(updateVAccount(updatedRewards));
  }

  return (
    <Screen style={styles.container}>
      <Label text={`Available Balance: ${balanceAmount}`}/>
      <Label text={`Total Reward Points: ${balancePoints}`}/>
      <Label
        text="Enter FD amount:" />
      <TextInput
          keyboardType="number-pad"
          placeholder="Amount"
          maxLength={10}
          style={styles.amtField}
          value={amount}
          onChangeText={onTextChanged}
        />
      <Label
        text="Select Tenure(in Years):" />
      <CustomPicker
          data={tenure}
          selectedItem={selectedTenure}
          displayField="number"
          keyField="number"
          onSelect={setTenure}
          placeholder="Choose Tenure:"
      />
      {tenureSelected && <>
        <Label
          text={`You Earn: ${amount * selectedTenure.reward} Reward Points`} />
        <Image
          style={styles.rewardImage}
          source={badgeSource}
        />
        </>
      }
      <Error
        visible={error}
        message={`Entered Amount ${amount}, Exceeds your available balance`}
      />
      <Button
        disable={error}
        title="Create Fixed Deposit"
        style={{ marginBottom: 10 }}
        onPress={() => {
          // navigation.navigate("fdpage");
          createFixedDeposit()
        }}
      />
      <Label
        text="Fixed Deposit Summary"
        style={{
          paddingTop: 10,
        }}
      />
      <FlatList
        data={DATA}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItems}>
            <View>
              <Text>Amount: {item.amount}</Text>
              <Text>Date: {item.date}</Text>
            </View>
            <Text>Earned Reward: {item.reward}</Text>
          </View>
        )}
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
    fontSize: 18,
    paddingTop: 10
  },
  labeltext: {
    textAlign: "left",
    fontSize: 16,
    paddingTop: 10
  },
  amtContainer: {
    marginVertical: 20,
    flexDirection: "row",
  },
  amtField: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    height: 50,
    width: 250
  },
  rewardImage: {
    paddingTop: 20,
    width: '40%',
    height: '20%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  listItems: {
    padding: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  error: {
    color: '#ff0000',
    paddingTop: 10,
  }
});

export default TransferAsFixedDeposit;
