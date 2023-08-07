import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Sommaire from "./assets/Sommaire.json";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from "react-native";


const Stack = createNativeStackNavigator();

export default function App() {
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Subtitles" component={SubtitlesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}


// partie CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
        MedicalBook{" "}
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
          MedicalBook{" "}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "green",
            textAlign: "center",
            paddingBottom: 10,
          }}
        >
          Chapitres:
        </Text>
        {Sommaire["Titles"].map((item, id) => (
          <TouchableOpacity key={id} onPress={() => navigation.navigate('Subtitles', {
            titleId: item.title,
          })}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function SubtitlesScreen({ route, navigation }) {
  const { titleId } = route.params;
  const [data, setData] = useState([]);

  function getTitleSubtitles() {
    let activeTitle = Sommaire.Titles.find((item) => item.title === titleId);
    return activeTitle.Subtitles;
  }
  
  useEffect(() => {
   let subs=  getTitleSubtitles()
   setData(subs)
  }, []);

  console.log(getTitleSubtitles());

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
       Hello
      </Text>
      {data.map((item, idx) => (
          <View>
            <Text>{item.subtitle}</Text>
          </View>
        ))}
    </View>
  );
}
