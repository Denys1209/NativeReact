import {Text, View,  Image, StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  Profile: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/10,
    flexDirection: 'row',
  },
  image:{
    borderRadius: 20,
    width: 40,
    height: 40,

  }
})

export const Profile = ({title, imageUrl, isCompany}) => {
    return (
        <View style={styles.Profile}>
            <Image source = {{uri: imageUrl}} style={styles.image}/>
            <View>
              <Text>Nick:{title}</Text>
              <Text>{isCompany ? "Company" : "person"}</Text>

            </View>
        </View>
    );

}
