import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './src/custom-theme.json';
import { BackHandler } from 'react-native';
import JailMonkey from 'jail-monkey'

function App(){

  //	is this device jail-broken/rooted.
  //  se tiver algum problema não acessa o app
  // if(JailMonkey.isJailBroken()){
  //   BackHandler.exitApp();
  // }

  return(
    <>
    <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <SafeAreaProvider>
            <AppNavigator />
        </SafeAreaProvider>
    </ApplicationProvider>
  </>);
}

export default App;