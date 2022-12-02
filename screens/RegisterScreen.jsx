import  {AuthContext}  from "./Context";
import axios from 'axios';

import React,{ useState } from "react"
import { View, TextInput, StyleSheet, Dimensions, Text, Alert } from "react-native"
import { PressableButton } from "../components/PressableButton"
import { Loading } from '../components/Loading';
import uuid from 'react-native-uuid';


export const RegisterScreen = ({navigation}) =>{

    const [gmail, setGmail] = useState();
    const [password, setPassword] = useState();
    const [nick, setNick] = useState();
    const [error, setError] = useState("");
    const [Data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);
    const [Id, setId] = useState(0);
    const [User, setUser] = useState();
    const [isCompany, setCompany] = useState(false);
    const {authContext} = React.useContext(AuthContext);

    const chageFlagCompany = () =>
    {
      setCompany((isCompany ? false : true))
    }
    const  registration= async ()=>
    {
    setLoading(true)
     await axios.get('https://63035bc79eb72a839d7eb2d9.mockapi.io/Users')
     .then(({data}) => {
      setData(data);
      
     }).finally( async ()=>{
      for (var i =0; i< Data.length; ++i)
        {
          if (Data[i].Gmail == gmail )
          {
            setError("this gmail is already exist")
            setLoading(false)
            return;
          }
        }
        if (Loading){
        setId(uuid.v1());
        const request = 
        {
            id: Id,
            Nick: nick,
            Gmail: gmail,
            password: password,
            IsCompany: isCompany,
            HowManyTrashPoints: 0,
            HowManyTrashPointsCleanUp: 0,
        }
        await axios.post("https://63035bc79eb72a839d7eb2d9.mockapi.io/Users", request);
        authContext.SignIn(request);
        
        setLogin(true)      
      }
      }
     ).catch(()=>alert('ERRR'));
     setLoading(false)


    }
    if (isLoading)
  {
      return <Loading/> 
  }
   
  
    return (
    <View style={styles.container}>
        <TextInput
    style={styles.input}
    onChangeText={setNick}
    placeholder="enter nick"
    value={nick}
  />
   
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
 
        <PressableButton onPress={() => chageFlagCompany()} bgColor={isCompany ? "green" : "red"} title = "Is company"/>

       
      
    <Text style={{ color: 'red'}}>{error}</Text>

    <PressableButton onPress={() => registration()} bgColor='orange' title = "Login"/>

  </View>)
}

const styles = StyleSheet.create({
    input: {
      height: 40,
     
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      width:Dimensions.get('window').width*0.80,
    },
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent:'flex-start',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width:Dimensions.get('window').width*0.80
      },
      Loading:
      {
      
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
    });