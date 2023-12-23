import { Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { gallery } from '../galleryJSON';

export default function Home({ navigation }) {
  function handleNavigation(image:string){
    navigation.navigate('SetWallpaper',  { image });
  }
  const listItems = ({item})=>(
    <TouchableOpacity  style={styles.imageBox} onPress={() => handleNavigation(item.name)}>
      <Image source={{uri: item.path}} style={styles.image}/> 
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={gallery}
      renderItem={listItems}
      keyExtractor={(item) => item.name}
      numColumns={2}
    />
    // <ScrollView>
    //   <View style={styles.container}>
    //     { gallery.map((value, key:number) => 
    //         <View key={key} style={styles.imageBox}>
    //           <Image source={value.path} style={styles.image}/> 
    //           <Text style={styles.title}>{value.name}</Text>
    //         </View>
    //     )}
    //   </View>
    // </ScrollView>
  )
}
const styles = StyleSheet.create({
  imageBox:{
    width:'44%',
    justifyContent:'center',
    alignItems: 'center',
    margin:10,
  },image:{
    width: '100%',
    height:300,
  },title:{
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 1
  }
})