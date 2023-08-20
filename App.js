import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Sommaire from "./assets/Sommaire.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReactJson from "react-json-view";

const Stack = createNativeStackNavigator();

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(Sommaire) //API
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Subtitles" component={SubtitlesScreen} />
        {/* <Stack.Screen name="Content" component={ContentScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function HomeScreen({ navigation }) {
  const [searchInput, onSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

  useEffect(() => {
    const titles = Sommaire.Titles.map((t) => t);

    const searchResults = titles.filter((t) =>
      t.title?.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchResult(searchResults);
  }, [searchInput]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {/* <ReactJson src={Sommaire} /> */}

      <TextInput
        onChangeText={onSearch}
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="Search here"
      />
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          // justifyContent: "space-between",
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
        {searchResult.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() =>
              navigation.navigate("Subtitles", {
                titleId: item.title,
              })
            }
          >
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <Text>{"title:"}</Text>
              <Text>{item?.title}</Text>
              {item?.content && <Text>{"Content:"}</Text>}
              {item?.content && (
                <Text
                  style={{
                    marginLeft: 20,
                  }}
                >
                  {item?.content}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function SubtitlesScreen({ route, navigation }) {
  const { titleId } = route.params;
  const [data, setData] = useState([]);

  const [searchInput, onSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

  function getTitleSubtitles() {
    let activeTitle = Sommaire.Titles.find((item) => item.title === titleId);
    if (activeTitle.Subtitles) {
      return activeTitle.Subtitles;
    }
    return [];
  }

  useEffect(() => {
    let subs = getTitleSubtitles();
    setData(subs);
  }, []);

  useEffect(() => {
    const subtitles = data;
    const searchResults = subtitles.filter((t) =>
      t.subtitle?.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResult(searchResults);
  }, [searchInput, data]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TextInput
        onChangeText={onSearch}
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="Search here"
      />

      {searchResult.map((item, idx) => (
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text>{"Subtitle:"}</Text>
          <Text>{item?.subtitle}</Text>
          <Text>{"Content:"}</Text>
          {item?.content && <SubtitleContent content={item?.content} />}
          <Text
            style={{
              marginLeft: 20,
            }}
          >
            {item?.content}
          </Text>
        </View>
      ))}
    </View>
  );
}

function SubtitleContent({ content }) {
  const [searchInput, onSearch] = React.useState("");
  function countInstances(string, word) {
    return string.split(word).length - 1;
  }

  return (
    <View>
      <TextInput
        onChangeText={onSearch}
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="Search here"
      />

      <Text>
        {"occurences: "} {countInstances(content, searchInput)}
      </Text>
    </View>
  );
}
