import React from 'react';
import MainNavigator from './src/navigations/MainNavigator';
import {TamaguiProvider} from 'tamagui';
import config from './tamagui.config.ts';
import {YStack, useTheme} from 'tamagui';

function App(): Element {
  return <MainNavigator />;
}
export default App;
