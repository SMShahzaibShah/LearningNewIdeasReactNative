import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const downloadFile = () => {
    console.log("yes");
    const uri = "http://techslides.com/demos/sample-videos/small.mp4";
    let fileUri = FileSystem.documentDirectory + "small.mp4";
    FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        console.log("Download ho gya");
        saveFile(uri);
        getFile(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };

  const getFile = async (fileUri) => {
    const info = await FileSystem.getInfoAsync(fileUri);
    console.log(info);
  };
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Button title="download" onPress={() => downloadFile()}></Button>
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
