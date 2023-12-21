import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import SelectWallpaper from './components/SelectWallpaper';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen name="SetWallpaper" component={SelectWallpaper} options={{title: 'Set Wallpaper'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
}