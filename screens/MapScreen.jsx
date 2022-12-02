import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions,TouchableOpacity} from 'react-native';
import { Loading } from '../components/Loading';
import MapView from 'react-native-maps';
import { Callout } from 'react-native-maps';
import {PointOnMap} from '../components/PointOnMap';
import React from 'react';
import axios from 'axios';
import { Marker } from 'react-native-maps';



export const  MapScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);


  const fetchPoints = ()=>
  {
    setIsLoading(true);
    axios.get('https://63035bc79eb72a839d7eb2d9.mockapi.io/Test2')
    .then(({data}) => 
    {
      setItems(data)
    }).catch(err => { 
      Alert.alert('Error', 'network')
    }).finally(() =>
    {
      setIsLoading(false);
    });
  };
  React.useEffect(
    fetchPoints, []
    );
  if (isLoading)
  {
      return <Loading/> 
  }



  return (
    <View style={styles.container}>
      
      <MapView style={styles.map} >
      {items.map((item) => 
      {
         return (<Marker 
         key={item.id} 
         coordinate={{latitude: item.latitude, longitude: item.longitude}}
         onCalloutPress={() => navigation.navigate('FullPostScreen', {id: item.id, Data:item})}
         >
          <Callout  tooltip={true}>
          
          <PointOnMap item = {item}/>
        
          </Callout>
          </Marker>)
      })
    }
   
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
 
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
 
});