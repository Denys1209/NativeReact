import React from "react"
import axios from 'axios';
import {  View, StyleSheet, Dimensions, Text, Alert } from "react-native";
import { PressableButton } from "../components/PressableButton";
import { Profile } from "../components/Profile";
import  {AuthContext}  from "./Context";
import { Loading } from '../components/Loading';

export const HomeScreen = ({navigation}) =>
{
 
    const {user} = React.useContext(AuthContext);
    const [profileUser, setProfileUser] = React.useState({Nick: "Rer",
    Gmail: "Rer",
    password: "Rer",
    Nick: "Rer",
    IsCompany: true,
    avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/790.jpg",
    HowManyTrashPoints: 60,
    HowManyTrashPointsCleanUp: 70,
    id: "3"
  });
    const [Nick, setNick] = React.useState();
    const [avatar, setAvatar] = React.useState();

    const [isLoading, setIsLoading] = React.useState(false);

    // const fetchPost = async ()=>
    // {
    //   setProfileUser(user);
    // };
    // React.useEffect(() =>
    //     fetchPost
    // );
    if (isLoading)
    {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Loading/>
        </View>;
    }

    return (<View style={styles.container}>
    <Profile imageUrl="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/790.jpg" title={profileUser.Nick} isCompany={true} />

    <PressableButton onPress={() => navigation.navigate('MapScreen')} bgColor='orange' title = "screen map"/>
    <PressableButton onPress={() => navigation.navigate('AddPointScreen')} bgColor='orange' title = "Add post"/>

   
 </View>);   
}
const styles = StyleSheet.create({
 
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'flex-start',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        
      },
  
})


