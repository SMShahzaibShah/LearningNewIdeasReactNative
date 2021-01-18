import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [getDownload, setDowload] = useState(false);
  const [getModal, setModal] = useState(false);
  const [getText, setText] = useState(false);

  const SaveData = async (item) => {
    const allBooks = await AsyncStorage.getItem("@AllBooksInfo");
    if (allBooks == null) {
      await AsyncStorage.setItem("@AllBooksInfo", JSON.stringify(item));
    } else {
      console.log("here");
      await AsyncStorage.mergeItem("@AllBooksInfo", JSON.stringify(item));
    }
  };

  const outputData = async () => {
    const allBooks = await AsyncStorage.getItem("@AllBooksInfo");
    console.log(allBooks);
  };

  const downloadFile = (bookName) => {
    console.log("yes");
    setText(false);
    const uri =
      "https://snewd.com/wp-content/uploads/2020/01/Tale-Of-Two-Cities-A-Charles-Dickens.pdf";
    let fileUri = FileSystem.documentDirectory + bookName + ".pdf";
    FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        console.log("Download ho gya");
        saveFile(uri);
        console.log("done");
        setText(true);
        SaveData(fileUri);
        setModal(false);
        outputData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync("expoDownload");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("expoDownload", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    }
  };

  const getFile = async (fileUri) => {
    const info = await FileSystem.getInfoAsync(fileUri);
    console.log(info);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Button
        title="download"
        onPress={() => {
          setModal(true);
          downloadFile("checking1ss");
        }}
      ></Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={getModal}
        presentationStyle="overFullScreen"
        style={{ height: 200, width: 100, backgroundColor: "red" }}
      >
        <View
          style={{
            justifyContent: "flex-end",
            margin: 0,
          }}
        >
          <View
            style={{
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
            }}
          >
            {getText === false ? (
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Please Wait Book is Downloading
              </Text>
            ) : (
              <Text>Book Download Successfully</Text>
            )}

            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        </View>
      </Modal>
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
