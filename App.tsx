import React from 'react';
import MainNavigator from './src/navigations/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {ImageBackground, StyleSheet} from 'react-native';

function App() {
  return (
    <ImageBackground
      source={require('./src/assets/background.jpg')}
      style={styles.background}>
          <Provider store={store}>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </Provider>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
export default App;
