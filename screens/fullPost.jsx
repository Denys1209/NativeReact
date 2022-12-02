import React from "react";
import { View, ActivityIndicator, Text, Image, Alert, Button } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Loading } from "../components/Loading";
import styled from 'styled-components/native'
const PostImage = styled.Image`
    border-radius: 10px;
    width: 100%;
    height: 250px;
    margin-bottom: 20px;

`;

const PostText = styled.Text`
    font-size: 18px;
    line-height: 24px;
`;
export const FullPostScreen = ({route, navigation}) =>
{
  
    const {id, Data} = route.params;
    const del = () =>
    {
        axios.delete('https://63035bc79eb72a839d7eb2d9.mockapi.io/Test2/'+id)
        navigation.goBack();
    }
  
    return (
        <View style={{padding: 20}}>
            <PostImage source = {{uri: "http://loremflickr.com/640/480/nature"}}/>
            <PostText>data:{new Date(Data.createdAt).toLocaleDateString()}</PostText>
            <PostText>was created by {Data.WhoCreated}</PostText>
            <PostText> 
            {Data.descriptions}</PostText>
            <PostText>size garbage: {Data.garbageSize}</PostText>

            <IconButton 
                style={{color: "red"}}
                icon="delete"
                size={50}
                onPress={() => del()}
               />

        </View>
    )
}

