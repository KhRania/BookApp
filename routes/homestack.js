import { createStackNavigator } from "react-navigation-stack";
import{ createAppContainer } from 'react-navigation';
import Titles from "../Screens/Titles";
import subtitles
 from "../Screens/subtitles";

 const Screens = {
    Home : {
        screen: Titles
    },
    subtitles :{
        screen : subtitles
    }
 }
 const Homestack = createStackNavigator (Screens);
 export default createAppContainer (Homestack);