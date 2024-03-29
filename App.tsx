import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/es';

/* Env */
import { ONESIGNAL_APP_ID } from '@env';

/* Features */
import { store, persistor } from './src/features';

/* Context */
import { ThemeProvider } from './src/theme';
import { NetworkProvider } from './src/context';

/* Navigation */
import { Navigation } from './src/navigation';

/* Global config of dayjs */
dayjs.extend(weekday);
dayjs.locale('es');

/**
 * This is the entry point of the app that renders all the necessary
 * parts for its operation.
 */
const App = () => {
  /**
   * Effect to initialize the OneSignal SDK and
   * listen for push notifications.
   */
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(ONESIGNAL_APP_ID);

    OneSignal.Notifications.requestPermission(true);
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NetworkProvider>
      <MenuProvider>
        <ThemeProvider>
          <Provider store={ store }>
            <PersistGate loading={ null } persistor={ persistor }>
              <PaperProvider>
                <NavigationContainer>
                  <Navigation />
                </NavigationContainer>
              </PaperProvider>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </MenuProvider>
    </NetworkProvider>
  );
}

export default App;