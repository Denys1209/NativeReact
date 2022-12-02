import react from "react";
import  {AuthContext}  from "./Context";

import { HomeScreen } from "./HomeScreen";
import { MapScreen } from "./MapScreen";
import { FullPostScreen } from "./fullPost";
import { AddPointScreen } from "./AddPointScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StartScreen } from "./StartScreen";
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Stack = createNativeStackNavigator();
const startStack = createNativeStackNavigator();
{/*const AppNavigator = createDrawerNavigator({
    Home: {
      screen: HomeScreen
    },
    About: {
      screen: MapScreen
    },
    Contact: {
      screen: AddPointScreen
    }
  }, {
      initialRouteName: "Home",
        contentOptions: {
          activeTintColor: '#e91e63'
       }
    });*/}
export const Navigation = () => 
{
   
    const [isLoading, setIsLoading] = react.useState(true);
    const [user, setUser] = react.useState();
    const authContext = react.useMemo(() =>{
      return {
          SignIn: (User)=>
          {
              setIsLoading(true);
              setUser(User);

          },
          SignUp: (User)=>
          {
              setIsLoading(true);
              setUser(User);
          },
          SignOut: ()=>
          {
              setIsLoading(false);
          
          },
      };
  }, []);
  
    return(
        <AuthContext.Provider value={{authContext, user, setUser}}>

        <NavigationContainer>

            {isLoading ?(
                <startStack.Navigator>
                    <startStack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'homeScreen' }} />
                    <Stack.Screen name="MapScreen" component={MapScreen} options={{title: 'mapScreen'}}/>
                    <Stack.Screen name="AddPointScreen" component={AddPointScreen} options={{title: 'AddPointScreen'}}/>
                    <Stack.Screen name="FullPostScreen" component={FullPostScreen}  options={{title: 'FullPostScreen'}}/>

                </startStack.Navigator>

            ) :(
        <Stack.Navigator>
            <Stack.Screen name="StartScreen" component={StartScreen} options={{title: 'StartScreen'}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{title: 'LoginScreen'}}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen}  options={{title: 'RegisterScreen'}}/>

        </Stack.Navigator>
        )
    }

        
       


    </NavigationContainer>
    </AuthContext.Provider>


    );
}
