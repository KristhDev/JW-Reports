import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
import { MenuProvider } from 'react-native-popup-menu';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import store, { persistor } from './src/features/store';

import Navigation from './src/navigation/Navigation';

import { ThemeProvider } from './src/theme/context';

dayjs.locale('es');

const App = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <MenuProvider>
      <ThemeProvider>
        <Provider store={ store }>
          <PersistGate loading={ null } persistor={ persistor }>
              <NavigationContainer ref={ navigationRef }>
                <Navigation />
              </NavigationContainer>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </MenuProvider>
  );
}

export default App;