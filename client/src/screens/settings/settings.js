import React, { useState, useReducer, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Slider, Modal, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import Screen from "../../components/screen";
import Label from "../../components/label";
import Button from "../../components/button";
import { getPreference } from "../../domain/actions/preferences.action";
import { createAccount } from "../../domain/actions/createVA.action";

//Similar to this we will get userPreference from API
const defaultPreferences = {
  percent: 0,
  options: {
    cardPayment: false,
    onlinePayment: false,
    transfers: false,
  },
};
const reducer = (state, newState) => ({ ...state, ...newState });

const Settings = ({ navigation }) => {
  const { fetching, preferences } = useSelector((store) => {
    return {
      fetching: store.userPreference.fetching,
      preferences: store.userPreference.preferences,
    };
  });
  const updateSuccess = useSelector(
    (store) => store.createAccount.data.success || false
  );
  const updating = useSelector(
    (store) => store.createAccount.fetching || false
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("getPReference invoke");
    dispatch(getPreference());
  }, []);

  useEffect(() => {
    setModalVisible(updateSuccess);
  }, [updateSuccess]);

  useEffect(() => {
    console.log("preferences", preferences);
    if (preferences.virtualAccount) {
      setSliderValue(preferences.percent);
      setOptions(preferences.options);
    }
  }, [preferences]);

  let userPreference = defaultPreferences;
  let buttonText = "Create Virtual Account";
  let message = "created";
  if (preferences.virtualAccount) {
    userPreference = preferences;
    buttonText = "Update Virtual Account";
    message = "updated";
  }
  const [sliderValue, setSliderValue] = useState(userPreference.percent);
  const [options, setOptions] = useReducer(reducer, userPreference.options);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    const payload = {
      virtualAccount: true,
      percent: sliderValue,
      options,
    };
    console.log("payload", payload);
    dispatch(createAccount(payload));
  };

  const updateCheckBox = (name) => {
    setOptions({
      [name]: !options[name],
    });
  };

  const onSliderValueChanged = (_value) => {
    if (_value !== sliderValue) setSliderValue(_value);
  };

  return (
    <Screen style={styles.container} showLoader={fetching || updating}>
      <Label text="Choose the percentage" />
      <View style={styles.sliderContainer}>
        <Text style={styles.heading}>{sliderValue} %</Text>
        <Slider
          value={sliderValue}
          step={1}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#307ecc"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => onSliderValueChanged(value)}
          style={styles.slider}
        />
      </View>
      <Label text="Choose your saving options" />
      <View style={styles.checkboxcontainer}>
        <CheckBox
          title="Card Payments"
          checked={options.cardPayment}
          onPress={() => {
            updateCheckBox("cardPayment");
          }}
        />
        <CheckBox
          title="Online Payments"
          checked={options.onlinePayment}
          onPress={() => {
            updateCheckBox("onlinePayment");
          }}
        />
        <CheckBox
          title="Transfer"
          checked={options.transfers}
          onPress={() => {
            updateCheckBox("transfers");
          }}
        />
      </View>
      <Button title={buttonText} onPress={handleSubmit} />
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Congratulation!! Your account {message} successsfully
            </Text>
            <Image
              style={styles.rewardImage}
              source={require("../../../assets/level9.png")}
            />
            <Button
              title="Ok"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("dummy");
              }}
            />
            <Button
              title="Make a Payment"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("payments");
              }}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  sliderContainer: {
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
  },
  slider: {
    width: "80%",
    height: 40,
  },
  checkboxcontainer: {
    alignItems: "baseline",
    marginLeft: "2%",
    marginRight: "2%",
    paddingBottom: 20,
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
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
  rewardImage: {
    width: "70%",
    height: "28%",
  },
});

export default Settings;
