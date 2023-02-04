import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as PaperProvider } from 'react-native-paper';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

/* Features */
import store, { persistor } from './src/features/store';

/* Context */
import { ThemeProvider } from './src/theme/context';

/* Navigation */
import { Navigation } from './src/navigation';

/* Global config of dayjs */
dayjs.locale('es');

/**
 * This is the entry point of the app that renders all the necessary
 * parts for its operation.
 */
const App = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <MenuProvider>
      <ThemeProvider>
        <Provider store={ store }>
          <PersistGate loading={ null } persistor={ persistor }>
            <PaperProvider>
              <NavigationContainer ref={ navigationRef }>
                <Navigation />
              </NavigationContainer>
            </PaperProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </MenuProvider>
  );
}

export default App;