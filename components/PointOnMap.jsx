import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
const styles = StyleSheet.create({
 
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
      },
     pointOnMap:{
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRedius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150
      },
      name :
      {
        fontSize: 16,
        marginBottom: 5,
      },
      arrow: 
      {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderTopColor: '#fff',
          borderWidth: 16,
          alignSelf: 'center',
          marginTop: -32,
      },
      arrowBorder:{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    
      },
      image:{
        width: 140,
        height: 100,
    
      }
    })
    
export const PointOnMap = ({item}) => 
{
    return (<View>
            
    <View style={styles.pointOnMap}>
      <Text style={styles.name}>data:{new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text>
        <Image
          style={styles.image}
          source={{ uri: item.image }}
        />
      </Text>
    </View>
    <View style = {styles.arrowBorder}/>
    <View style = {styles.arrow}/>

  </View>);
}


