

import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import NavigationContainer from './src/services/navigation/NavigationContainer';
import NavigationService  from './src/services/navigation/NavigationService';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import DataReducer from './src/services/reducers/DataReducer';

const store = createStore(DataReducer);

class App extends Component {
  constructor(props) {
    super(props);
  }


render () {
  return (
    <Provider store={store}>
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <StatusBar barStyle={'light-content'} backgroundColor={"#085FAD"} />

        <NavigationContainer
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          
      </SafeAreaView>
    </Provider>
  );}
};

export default App;
