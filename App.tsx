import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import store, { persistor } from './src/features/store';

import Navigation from './src/navigation/Navigation';

import { ThemeProvider } from './src/theme/context';

dayjs.locale('es');

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;