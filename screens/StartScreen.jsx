import { View, StyleSheet, Dimensions, Text } from "react-native"
import { PressableButton } from "../components/PressableButton";

export const  StartScreen = ({navigation}) => {
    return (
    <View style={styles.container}>
        <PressableButton onPress={() => navigation.navigate('LoginScreen')} bgColor='orange' title = "LoginScreen"/>
        <PressableButton onPress={() => navigation.navigate('RegisterScreen')} bgColor='orange' title = "RegisterScreen"/>

    </View>)
}


const styles = StyleSheet.create({
 
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent:'flex-start',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        
      },
  
})
