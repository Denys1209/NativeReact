import { useState } from "react"
import React, {useEffect} from 'react';

import { View, TextInput, StyleSheet, Dimensions, Text, Alert } from "react-native"
import { PressableButton } from "../components/PressableButton"
import axios from 'axios';
import { Loading } from '../components/Loading';
import  {AuthContext}  from "./Context";

export const LoginScreen = ({navigation}) =>{

    const [gmail, setGmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [login, setLogin] = useState(false);
    const [Data, setData] = useState([]);    
    const {authContext} = React.useContext(AuthContext);
    const Login=async ()=>
  {
     setLoading(true)
     await axios.get('https://63035bc79eb72a839d7eb2d9.mockapi.io/Users')
     .then(({data}) => {
      setData(data);
      
     }).finally( ()=>{
      for (var i =0; i< Data.length; ++i)
        {
          if (Data[i].Gmail ==gmail && Data[i].password == password)
          {
            setLogin(true);
            authContext.SignIn(Data[i]);
            
            //navigation.navigate('HomeScreen');
            break;
          }
        }
       
        
      setError("Gmail or password wrong")
      setLoading(false)}).catch(()=>alert('ERRR'));
      
  }
  if (isLoading)
  {
      return <Loading/> 
  }
    
   

    return (<View style={styles.container}>
        <TextInput
    style={styles.input}
    onChangeText={setGmail}
    placeholder="enter gmail"
    value={gmail}
  />
   <TextInput
    style={styles.input}
    onChangeText={setPassword}
    placeholder="enter password"

    value={password}
  />
  <Text style={{ color: 'red'}}>{error}</Text>
    <PressableButton onPress={() => Login()} bgColor='orange' title = "Login"/>

  </View>)
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      width:Dimensions.get('window').width*0.80
    },
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent:'flex-start',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        
      },
    Loading:
    {
    
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      
    },
  });