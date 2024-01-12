
import React, { useEffect, useState } from 'react';
import { gallery } from '../galleryJSON';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  //PermissionsAndroid
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

  // const requestWallpaperPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.SET_WALLPAPER,
  //       {
  //         title: 'Set Wallpaper Permission',
  //         message:
  //           'Your app needs permission to set the wallpaper.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can set the wallpaper');
  //     } else {
  //       console.log('Change wallpaper permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const downloadWallpaper = (setAsWallpaper: boolean) => {
    !setAsWallpaper && NativeModules.MyNativeModule.showToast('Wallpaper is downloading...');
    let date = new Date();
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    const path = PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.jpeg'
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: 'Image',
      },
    };
    config(options).fetch('GET', wallpaper.uri).then(async(res) => {
        !setAsWallpaper && NativeModules.MyNativeModule.showToast('Wallpaper download successfully');
        if(setAsWallpaper){
          RNFetchBlob.fs.readFile(path, 'base64').then(base64Data => {
            NativeModules.MyNativeModule.setWallpaper(base64Data)
            NativeModules.MyNativeModule.showToast('Wallpaper change successfully');
          })
          .catch((error) => {
            console.error('Error reading file:', error);
          });
        }
      });
  };

  return (
    <View style={styles.container}>
    <ImageBackground source={wallpaper} style={styles.wallpaper}>
      <Text style={styles.title}>{image}</Text>
      <View>
      <TouchableOpacity onPress={() => downloadWallpaper(true)} style={styles.button}>
        <Text style={styles.buttonText}>Change Wallpaper.</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => downloadWallpaper(false)} style={styles.button}>
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
