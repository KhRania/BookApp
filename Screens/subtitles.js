import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from 'react-navigation/native';
import { createStackNavigator } from 'react-navigation/stack';
import { createAppContainer } from 'react-navigation';

import Sommaire from '../assets/Sommaire.json';

const App = () => {
  const [data, setData] = useState([]);
  console.log(Sommaire);

  useEffect(() => {
    fetch(Sommaire) //API
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  console.log(data);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>MedicalBook </Text>

      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>MedicalBook </Text>
        <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10 }}>Chapitres:</Text>
        {Sommaire['Subtitles'].map((item, id) => (
          <View key={id}>
            <Text>{item.Subtitle}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default App;

export function subtitles() {
  return (
    <View style={globalStyles.container}>
      <Text>Subtitles Screen</Text>
      <Button title = 'back to home screen ' onPress ={PressHandler}/>
    </View>
  );
}

// partie CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
