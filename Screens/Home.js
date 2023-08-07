import React from 'react';
import { StyleSheet , View , Text ,Button } from 'react-native';
import {globalStyles } from '../stylesglobal';


export default function Home ({Navigation}){
  const pressHandler = () => {

    Navigation.navigate ('Subtitles');
  }
}

return (
  <View style ={globalStyles.container}>
     <Text style={globalStyles.title } ></Text>
     <Button title='Subtitles ' onPress={pressHandler}></Button>
  </View>
)