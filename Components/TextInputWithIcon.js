import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function TextInput() {
  return (
    <View style={{ flexDirection: "row", marginTop: 30 }}>
      <TextInput
        placeholder="Enter Email / Phone Number"
        style={{
          width: 232,
          height: 45,
          borderRadius: 50,
          paddingLeft: 30,
          backgroundColor: "red",
        }}
      ></TextInput>
      <FontAwesome
        name="user"
        size={24}
        style={{
          alignSelf: "center",
          marginRight: 5,
          position: "absolute",
          padding: 10,
        }}
        color="#653CA0"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
