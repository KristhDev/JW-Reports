import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import store, { persistor } from './src/features/store';

import Navigation from './src/navigation/Navigation';

import { ThemeProvider } from './src/theme/context';

dayjs.locale('es');

const App = () => {
  return (
    <MenuProvider>
      <ThemeProvider>
        <Provider store={ store }>
          <PersistGate loading={ null } persistor={ persistor }>
              <NavigationContainer>
                <Navigation />
              </NavigationContainer>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </MenuProvider>
  );
}

export default App;