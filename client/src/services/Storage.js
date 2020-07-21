import * as SecureStore from "expo-secure-store";

const setItem = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log("Error while storing the value to storage", error);
  }
};

const getItem = async (key) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error while retriving the value from storage", error);
  }
};

const deleteItem = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error while deleting the value in storage", error);
  }
};

export default { setItem, getItem, deleteItem };
