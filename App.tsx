import React from 'react';
import MainNavigator from './src/navigations/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {ImageBackground, StyleSheet} from 'react-native';
//import '@tamagui/core/reset.css';
import {TamaguiProvider} from 'tamagui';
import tamaguiConfig from './tamagui.config';

function App() {
  return (
    <ImageBackground
      source={require('./src/assets/background.jpg')}
      style={styles.background}>
      <TamaguiProvider config={tamaguiConfig}>
        <Provider store={store}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </Provider>
      </TamaguiProvider>
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
