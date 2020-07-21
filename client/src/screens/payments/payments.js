import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Modal, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "ramda";
import Screen from "../../components/screen";
import Button from "../../components/button";
import Error from "../../components/error";
import CustomPicker from "../../components/custom.picker";
import Label from "../../components/label";
import { makePayment } from "../../domain/actions/payment.action";
import {
  fetchAccounts,
  updateAccountList,
} from "../../domain/actions/accounts.action";
import { updateVAccount } from "../../domain/actions/createVA.action";
import { getBalance } from "../../domain/actions/balances.action";

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
  const preferences = useSelector((store) => store.userPreference.preferences);

  const { percent = 0 } = preferences;

  const payments = useSelector((store) => store.makePayment.payments);
  const { Amount = {} } = useSelector((store) => store.accountBalance.balance);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [debitAccount, setDebitAccount] = useState({ balance: 0 });
  const [creditAccount, setCreditAccount] = useState();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const { AccountId: fromAccount } = debitAccount;
    const { AccountId: toAccount } = creditAccount;
    const rewardAmount = Math.floor(amount * (percent / 100));
    const rewardPts = Math.floor(amount * 0.01);
    const payload = {
      fromAccount,
      toAccount,
      date: new Date().toISOString().split("T")[0],
      amount,
      rewardAmount,
      rewardPts,
    };

    const updatedAccountList = getUpdatedAccounts(
      accounts,
      fromAccount,
      toAccount,
      Number(amount) + Number(rewardAmount)
    );

    const updatedRewards = {
      ...preferences,
      account: {
        rewardPts: preferences.account.rewardPts + rewardPts,
        rewardAmount: preferences.account.rewardAmount + rewardAmount,
      },
    };

    payments.push(payload);
    dispatch(makePayment(payments));
    dispatch(updateAccountList(updatedAccountList));
    dispatch(updateVAccount(updatedRewards));
    setModalVisible(true);
  };

  useEffect(() => {
    // setModalVisible(success);
  }, [success]);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  const onAccountSelection = (account) => {
    const { AccountId: accountId } = account;
    setDebitAccount(account);
    dispatch(getBalance(accountId));
  };

  const onAmountChange = (amount) => {
    const amt = Number(amount);
    const virtualAmount = Math.floor(amount * (percent / 100));
    if (virtualAmount + amt > debitAccount.balance) {
      setError(true);
    } else if (error) {
      setError(false);
    }
    setAmount(Number(amount));
  };

  return (
    <Screen style={styles.container} showLoader={posting || fetching}>
      <Label text="From Amount:" />
      <CustomPicker
        data={accounts}
        selectedItem={debitAccount}
        displayField="Nickname"
        keyField="AccountId"
        onSelect={onAccountSelection}
        placeholder="Select an account"
      />
      {!isEmpty(Amount) && <Text>Avaialble Balance: {Amount.Amount} </Text>}
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
        <Label text="Amount: " />
        <TextInput
          keyboardType="number-pad"
          placeholder="Amount"
          maxLength={10}
          style={styles.amtField}
          value={amount}
          onChangeText={onAmountChange}
        />
      </View>
      <Error
        visible={error}
        message="Entered Amount + Your Virtual Amount, Exceeds your available balance"
      />

      <Label text="Amount to be Credited to Your Virtual Account" />
      <Text style={styles.contText}>
        {Math.floor(amount * (percent / 100))}
      </Text>

      <Label text="Amount to be debited" />
      <Text style={styles.contText}>
        {" "}
        {amount + Math.floor(amount * (percent / 100))}
      </Text>

      <Label text="Earned reward point" />
      <Text style={styles.contText}> {Math.floor(amount * 0.01)}</Text>

      <Button
        disable={error}
        title="Make Payment"
        onPress={handleSubmit}
      ></Button>

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
    flex: 0.5,
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
    marginLeft: 10,
    borderRadius: 15,
    paddingLeft: 15,
    backgroundColor: "white",
    fontSize: 17,
  },
  contText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default payments;
