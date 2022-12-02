import { StyleSheet, Text, View, Button, Image, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { PressableButton } from '../components/PressableButton';
import { Loading } from '../components/Loading';
//import {DescriptionPostScreen} from './DescriptionPostScreen';
import axios from 'axios';
import uuid from 'react-native-uuid';
import * as Location from 'expo-location';

export const AddPointScreen = ({navigation}) =>
{
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [photoAlreadyTake, setPhotoAlreadyTake] = useState();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDescriptionStadio, setDescriptionStadio] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [typeGarbega, setTypeGarbega] = React.useState('small');
  const [sizeGarbega, setSizeGarbega] = React.useState('small');

 
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status == "granted");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })().finally(() =>
    {
      setIsLoading(false);
    });
  }, []);
  if (hasCameraPermission == undefined)
  {
    return <Text>Requesting permissions...</Text>
  }
  else if (!hasCameraPermission)
  {
    return <Text>Requesting for camera not granted. Please chage this is settings</Text>
  }
  if (errorMsg) {
    return<View style={styles.container}><Text>{errorMsg}</Text> </View>
  }
  if (isLoading)
  {
   return <Loading/> 
  }


  





  let takePic = async () => {
    let options = {
      qyality: 1,
      base64: true,
      exif: false,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  }
  if (photo){
    let savePhoto = () =>{
      setPhotoAlreadyTake(photo.uri);
      setPhoto(undefined);
      setDescriptionStadio(true);
    };


 
    return (
      <View >
        <Image style={styles.ImageStyle} source= {{uri: "data:image/jpg;base64," + photo.base64}}/>
        <View style={styles.StatusBarStyleImage}>
            <Button title='Save' onPress={savePhoto}/>
            <Button title='Discard' onPress={() =>setPhoto(undefined)}/>
        </View>
      </View>
    );
  }
  if (!photoAlreadyTake){
  return (
    <View style={styles.container}>
    <Camera style={styles.CameraStyle} ref ={cameraRef}>
    </Camera>
    <PressableButton  onPress={takePic} bgColor='orange' title = "take photo"/>
    </View>
  );
  }


 
 
 
  const AddPost = async () =>
  {
    var MyLatitude =parseFloat( location.coords.latitude);
    var MyLongitude = parseFloat( location.coords.longitude);
      const request = 
      {
          id: uuid.v1(),
          latitude: MyLatitude,
          longitude: MyLongitude,  
          WhoCreated: "Rer",  
          createdAt:  new Date().toLocaleString(),
          image: "https://loremflickr.com/640/480/city",
          descriptions: description,
          garbageSize: sizeGarbega,

      }
      
      const response = await axios.post("https://63035bc79eb72a839d7eb2d9.mockapi.io/Test2", request)
      setPhotoAlreadyTake(undefined);

  };
  if (isDescriptionStadio)
  {
    return (
        <View style={styles.container} >
            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                placeholder="enter description
                "
                value={description}
                multiline={true}
                numberOfLines={10}
                editable
            />
            <Text>
              garbage size
            </Text>
      <View style={styles.containerForRadioButton}>
      <View style={styles.readionButton}>
        <Text>small   </Text>
        <RadioButton
        value="small"
        status={ sizeGarbega == 'small' ? 'checked' : 'unchecked' }
        onPress={() => setSizeGarbega('small')}
      />
      </View>
      <View style={styles.readionButton}>
        <Text>normal</Text>
      <RadioButton
        value="normal"
        status={ sizeGarbega == 'normal' ? 'checked' : 'unchecked' }
        onPress={() => setSizeGarbega('normal')}
      />
       </View>
       <View style={styles.readionButton}>
        <Text>big        </Text>
      <RadioButton
        value="big"
        status={ sizeGarbega == 'big' ? 'checked' : 'unchecked' }
        onPress={() => setSizeGarbega('big')}
    />
        </View>
        </View>
        <PressableButton  bgColor='orange' title='send post' onPress={() => AddPost()}/>
        </View>
    )
  }
  return (<KeyboardAvoidingView style={styles.container}>
   
    <Image style={styles.ImageStyleEnd} source= {{uri: photoAlreadyTake}}/>
    
      <TextInput
      style={styles.input}
      onChangeText={setDescription}
      placeholder="enter description"
      value={description}
    />
 
 <Button title='send post' onPress={() => AddPost()}/>
    </KeyboardAvoidingView>
  );
}




const styles = StyleSheet.create({
  container: {
    //flexDirection: 'column',
    //alignSelf: 'flex-start',
    //alignItems: 'center',
    flex:10,
    justifyContent:'space-between',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    
  },
  containerForRadioButton: {
    flex: 1,
    flexDirection: 'column'
    
  },
  readionButton:
  {
    flexDirection: 'row',
    flex: 0,
    alignItems: 'center',
  },
    input: {
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      width:Dimensions.get('window').width*0.80,
      height: Dimensions.get('window').height*0.1
    },
    CameraStyle: {
      backgroundColor: '#fff',
    
      width: Dimensions.get('window').width*0.80,
      height: Dimensions.get('window').height/2,
    },
    ImageStyleEnd: {
      
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.50,
      },
      ImageStyle: {
      
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.8,
      },
    StatusBarStyleImage:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'stretch'
    },
    container:
    {
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent:'flex-start',
    },
    buttonContainer:{
      backgroundColor: '#fff',
      alignSelf: 'flex-end',
      justifySelf: 'self-start',
      
    },
    preview:{
      alignSelf: 'stretch',
      flex: 1,
    }
  });
  