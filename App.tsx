import React from 'react';
import '@tamagui/core/reset.css';
import {TamaguiProvider} from 'tamagui';
import {config} from '@tamagui/config/v2';
import {Button} from 'tamagui';

function App(): JSX.Element {
  return (
    <TamaguiProvider config={config}>
      <Button>Hello world</Button>
    </TamaguiProvider>
  );
}

export default App;
