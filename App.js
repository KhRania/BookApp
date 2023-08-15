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
    const titles = Sommaire.Titles.map((t) => t.title);

    const searchResults = titles.filter((t) => t.toLowerCase().includes(searchInput.toLowerCase()));

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
                titleId: item,
              })
            }
          >
            <Text>{item}</Text>
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
    return activeTitle.Subtitles;
  }

  useEffect(() => {
    let subs = getTitleSubtitles();
    setData(subs);
  }, []);

  useEffect(() => {
    const subtitles = data.map((t) => t.subtitle);
    const searchResults = subtitles.filter((t) => t.toLowerCase().includes(searchInput.toLowerCase()));

    setSearchResult(searchResults);
  }, [searchInput,data]);
console.log(data);
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
        <View>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );
}

// function Filtrage  ()  {
//   const [filterData, setfilterData] = useState ([]);
//   const [masterData, setmasterData] = useState ([]);
//   const [search , setsearch] = useState ('');

//   useEffect (() => {
//     fetchPosts ();
//     return ()=> {

//     }
//   },[])
//  const fetchPosts =() => {
//   fetch (Sommaire)
//   .then((response)=> response.json())
//   .then((responseJson)=> {
//     setfilterData(responseJson);
//     setmasterData(responseJson);
//   }).catch((error) => {
//     console.error(error);
//   })
//  }

//  const searchFilter =(text) => {
//   if(text){
//     const newData = masterData.filter((item) => {
//       const itemData = item.idx ? item.idx.toUpperCase ()
//       : ''.toUpperCase();
//       const textData = text.toUpperCase();
//       return itemData.indexOf(textData) > -1 ;
//     });
//     setfilterData(newData);
//     setsearch(text);
//   } else {
//     setfilterData(masterData);
//     setsearch(text);
//   }
//  }
//  const ItemView = ( {item}) => {
//   return(
//     <Text style ={styles.itemStyle}>
//       {item.id}{'. '}{item.idx.toUpperCase()}
//     </Text>
//   )
//  }
//  const ItemSeparatorView = () => {
//   return(
//     <View style = { {height : 0.5 , width : '100%' , backgroundColor: '#c8c8c8'}}/>
//   )
//  }
//  return(
//   <SafeAreaView style={ {flex: 1}}>
//     <View style ={styles.container} >
//       <TextInput
//       style={styles.TextInputStyle}
//       value={search}
//       placeholder="Search "
//       onChangeText={(Text) => searchFilter(text)}
//       />

//       <FlatList
//       data={filterData}
//       keyExtractor={(item, index) => index.toString()}
//        ItemSeparatorComponent={ItemSeparatorView}
//        renderItem={ItemView}
//       />

//     </View>
//   </SafeAreaView>

//  );
//  const styles = StyleSheet.create (
//   {
//     container: {
//       backgroundColor : 'white',
//          },
//          itemStyle :{
//           padding :15
//          },
//          TextInputStyle : {
//           height : 60,
//           borderWidth : 1,
//           paddingLeft : 20 ,
//           margin : 5,
//           borderColor : '#009688',
//           backgroundColor:'white'
//          }
//   }
//  )
// }
