import React, { useState, useEffect } from "react";
import { map } from "ramda";
import { StyleSheet, Text, Modal, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Screen from "../../components/screen";
import Button from "../../components/button";
import CustomPicker from "../../components/custom.picker";
import Label from "../../components/label";
import { makePayment } from "../../domain/actions/payment.action";
import {
  fetchAccounts,
  updateAccountList,
} from "../../domain/actions/accounts.action";
import { updateAccount } from "../../domain/actions/createVA.action";

const getUpdatedAccounts = (accounts, debitAccId, creditAccId, amount) => {
  const accountList = accounts.map((account) => {
    const { AccountId, balance } = account;
    if (AccountId === debitAccId) {
      account.balance = balance - amount;
    } else if (AccountId === creditAccId) {
      account.balance = balance + amount;
    }
    return account;
  });
  return accountList;
};

const payments = ({ navigation }) => {
  const posting = useSelector((state) => state.makePayment.fetching);
  const fetching = useSelector((store) => store.accounts.fetching);
  const accounts = useSelector((store) => store.accounts.data);
  const success = useSelector(
    (state) => state.makePayment.data.success || false
  );
  const percentage = useSelector(
    (store) => store.userPreference.preferences.percent
  );

  const payments = useSelector((store) => store.makePayment.payments);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [debitAccount, setDebitAccount] = useState({ balance: 0 });
  const [creditAccount, setCreditAccount] = useState();
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const { AccountId: fromAccount } = debitAccount;
    const { AccountId: toAccount } = creditAccount;
    const rewardAmount = amount * (percentage / 100);
    const payload = {
      fromAccount,
      toAccount,
      date: new Date().toISOString().split("T")[0],
      amount,
      rewardAmount,
      rewardPts: amount * 0.01,
    };

    const updatedAccountList = getUpdatedAccounts(
      accounts,
      fromAccount,
      toAccount,
      Number(amount) + Number(rewardAmount)
    );

    payments.push(payload);
    console.log("payments", payments);
    dispatch(makePayment(payments));
    dispatch(updateAccountList(updatedAccountList));
  };

  useEffect(() => {
    setModalVisible(success);
  }, [success]);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  return (
    <Screen style={styles.container} showLoader={posting || fetching}>
      <Label text="From Amount:" />
      <CustomPicker
        data={accounts}
        selectedItem={debitAccount}
        displayField="Nickname"
        keyField="AccountId"
        onSelect={setDebitAccount}
        placeholder="Select an account"
      />
      <Text>Avaialble Balance: {debitAccount.balance} </Text>
      <Label text="To Amount:" />
      <CustomPicker
        data={accounts}
        selectedItem={creditAccount}
        displayField="Nickname"
        keyField="AccountId"
        onSelect={setCreditAccount}
        placeholder="Select an account"
      />
      <View style={styles.amtContainer}>
        <Label text="Amount" />
        <TextInput
          keyboardType="number-pad"
          placeholder="Amount"
          maxLength={10}
          style={styles.amtField}
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <Label text="Amount to be Credited to Your Virtual Account" />
      <Text style={styles.contText}> {amount * (percentage / 100)}</Text>

      <Label text="Earned reward point" />
      <Text style={styles.contText}> {amount * 0.01}</Text>

      <Button title="Make Payment" onPress={handleSubmit}></Button>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Payment Successfull</Text>
            <Button
              title="Make Another Payment"
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <Button
              title="Virtual Account Summary"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("summary");
              }}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    paddingVertical: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  amtContainer: {
    marginVertical: 20,
    flexDirection: "row",
  },
  amtField: {
    flex: 0.5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginLeft: 15,
    borderRadius: 25,
    paddingLeft: 15,
    backgroundColor: "white",
    fontSize: 17,
  },
  contText: {
    fontSize: 18,
  },
});

export default payments;
