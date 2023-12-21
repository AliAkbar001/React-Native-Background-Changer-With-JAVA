
import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules
} from 'react-native';

function App(): JSX.Element {
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1702906220516-11f24e4423c2?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

  const changeWallpaper = () => {
    NativeModules.MyNativeModule.showToast("Hello from Java!");
    setWallpaper('https://images.unsplash.com/photo-1702988319113-051682d600a4?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  };


  return (
    <View style={styles.container}>
    <ImageBackground source={{uri :wallpaper}} style={styles.wallpaper}>
      <TouchableOpacity onPress={changeWallpaper} style={styles.button}>
        <Text style={styles.buttonText}>Change Wallpaper</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
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
  },

});

export default App;
