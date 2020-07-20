import React,  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Modal, FlatList, Image } from "react-native";
import Screen from "../../components/screen";
import Label from "../../components/label";
import Button from "../../components/button";
import MyCarousel  from "../../components/carousel/mycarousel"

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

const Summary = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const payments = useSelector((store) => store.makePayment.payments);
  const balAmount = (accumulator, currentValue) => (Number(accumulator) + Number(currentValue.rewardAmount));
  const balPoints = (accumulator, currentValue) => (Number(accumulator) + Number(currentValue.rewardPts));
  const balanceAmount = payments.reduce(balAmount, 0)
  const balancePoints = payments.reduce(balPoints, 0)

  const onOfferSelected = (data) => {
    console.log('On OFFER', data)
    navigation.navigate("offer-creation", {...data});
  }

  return (
    <Screen>
      <View style={styles.centeredView}>
        <Label text={`Available Balance: ${balanceAmount}`}/>
        <Label text={`Total Reward Points: ${balancePoints}`}/>

        <Image
          style={styles.rewardImage}
          source={require('../../../assets/level1.png')}
        />
        
        <Button title="Transfer"
          onPress={() => {
            navigation.navigate("transfer");
          }}
        />
        <Button
          title="Virtual Account Settings"
          style={{ marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("settings");
          }}
        />
        <Button
          title="Virtual Account Transactions"
          style={{ marginBottom: 10 }}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      <Label
        text="Your Offers" />
      <MyCarousel whenClicked={onOfferSelected}></MyCarousel>
      
      <Modal animationType="slide" visible={modalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your recent Virtual Account Transactions</Text>
            <FlatList
              data={payments}
              renderItem={({ item }) => (
                <View style={styles.listItems}>
                  <View>
                    <Text>Transferred: <Text style={styles.weight}>{item.amount}</Text></Text>
                    <Text>Date: <Text style={styles.weight}>{item.date}</Text></Text>
                  </View>
                  <View>
                    <Text>Amount Saved: <Text style={styles.weight}>{item.rewardAmount}</Text></Text>
                    <Text>Earned Reward: <Text style={styles.weight}>{item.rewardPts}</Text></Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <Text style={styles.separator} />}
            /> 
            <Button
              title="Ok"
              style={{ marginBottom: 10 }}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
      </Modal>

      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    padding: 20,
  },
  listItems: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",

  },
  rewardImage: {
    width: '40%',
    height: '20%'
  },
  modalView: {
    flex: 1,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 40,
    backgroundColor: "white",
    padding: 15,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
  },
  weight: {
    fontWeight: "bold",
  }
});

export default Summary;
