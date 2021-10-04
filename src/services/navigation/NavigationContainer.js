import { createAppContainer, createSwitchNavigator, createStackNavigator } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
import navigationConstants from './../../constants/navigationConstants';
import  HomeScreen  from './../../components/HomeScreen.js';
import CoinScreen from './../../components/CoinScreen.js';
import SearchScreen from './../../components/SearchScreen.js';

const AppNavigator = createSwitchNavigator(
  {
    [navigationConstants.HOME_SCREEN]: HomeScreen,
    [navigationConstants.COIN_SCREEN]: CoinScreen,
    [navigationConstants.SEARCH_SCREEN]: SearchScreen,
  },
  {
    initialRouteName: 'HomeScreen',
  }
);

export default (NavigationContainer = createAppContainer(AppNavigator));