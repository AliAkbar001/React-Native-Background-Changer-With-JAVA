
import React, { useEffect, useState } from 'react';
import { gallery } from '../galleryJSON';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'

function SelectWallpaper({ route }): JSX.Element {
  const  image  = route.params.image;
  const [wallpaper, setWallpaper] = useState(require('../assets/white-background.jpeg'));

  useEffect(() => {
    gallery.forEach(element => {
      if(element.name === image){
        setWallpaper({uri: element.path});
      }
    });
  }, [image])

  const changeWallpaper = () => {
    NativeModules.MyNativeModule.showToast('Wallpaper Change Successfully');
  };

  const downloadWallpaper = () => {
    NativeModules.MyNativeModule.showToast('Wallpaper is downloading...');
    let date = new Date();
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path: PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.jpeg',
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', wallpaper.uri)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        NativeModules.MyNativeModule.showToast('Wallpaper download successfully');
      });
  };

  return (
    <View style={styles.container}>
    <ImageBackground source={wallpaper} style={styles.wallpaper}>
      <Text style={styles.title}>{image}</Text>
      <View>
      <TouchableOpacity onPress={changeWallpaper} style={styles.button}>
        <Text style={styles.buttonText}>Change Wallpaper</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={downloadWallpaper} style={styles.button}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wallpaper: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "flex-end",
    padding: 15
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#383737',
    textAlign: 'center'
  },
  title:{
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 18
  },
});

export default SelectWallpaper;
