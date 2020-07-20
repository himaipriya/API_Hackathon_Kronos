import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const Item = ({ item, displayField, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.listItem}>{item[displayField]}</Text>
    </TouchableOpacity>
  );
};

const CustomPicker = ({
  placeholder,
  data,
  selectedItem,
  onSelect,
  displayField,
  keyField,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {selectedItem ? selectedItem[displayField] : placeholder}
          </Text>
          <EvilIcons name="chevron-down" size={35} color="black" />
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={data}
              keyExtractor={(item) => item[keyField].toString()}
              renderItem={({ item }) => (
                <Item
                  item={item}
                  displayField={displayField}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                />
              )}
              ItemSeparatorComponent={() => <Text style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  centeredView: {
    flex: 0.5,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    flex: 1,
    fontSize: 18,
  },
  listItem: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
  },
});

export default CustomPicker;
