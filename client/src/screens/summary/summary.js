import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
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
      <Label
        text="Your Offers" />
      <MyCarousel whenClicked={onOfferSelected}></MyCarousel>
      
      <Label
        text="Last 5 Transactions"
        style={{
          paddingTop: 0,
        }}
      />
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.listItems}>
            <View>
              <Text>Amount: {item.amount}</Text>
              <Text>Date: {item.date}</Text>
            </View>
            <Text>Earned Reward: {item.reward}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Text style={styles.separator} />}
      />
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
  }
});

export default Summary;
