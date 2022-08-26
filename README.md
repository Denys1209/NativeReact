# NativeReact
import styled from 'styled-components/native'


const PostView = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0,0,0,0.1);
  border-bottom-style: solid;
`;

const PostImage = styled.Image`
    width: 60px;
    height: 60px;
    border-radius:90px;
    margin-right: 12px;
    `;
const PostTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;
const PostDetails = styled.View`
  justify-content: center;
`;


const PostDate = styled.Text`
  flex:1;
  font-size: 12px;
  color: rgba(0,0,0,0.4);
  margin-top: 2px;
`;


export const Post = ({title, imageUrl, createdAt}) => {
    return (
        <PostView>
            <PostImage source = {{uri: imageUrl}}/>
            <PostDetails>
              <PostTitle>{title}</PostTitle>
              <PostDate>{createdAt}</PostDate>

            </PostDetails>
        </PostView>
    );

}



import axios from 'axios';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Post } from './components/post';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [items, setItems] = React.useState();


  React.useEffect(() =>
  {
    axios.get('https://63035bc79eb72a839d7eb2d9.mockapi.io/JsonPosts')
    .then(({data}) => 
    {
      setItems(data);
    }).catch(err => { 
      Alert.alert('Error', 'network')
    });
  }, []
  );

  return (
    <View>
      {
        [... items, ... items].map((obj) => (
          <Post 
          title={obj.title}
          createdAt = {obj.createdAt}
          imageUrl = {obj.imageUrl}      />
        ))
      }
      <StatusBar style="auto" />
    </View>
  );
}



