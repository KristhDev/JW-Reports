import React, { useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
import SplashScreen from 'react-native-splash-screen';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/es';

import './src/config/unistyles';

/* Env */
import { ONESIGNAL_APP_ID } from '@env';

import { Provider } from './src/providers';

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
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

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
    <Provider>
      <NavigationContainer ref={ navigationRef }>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;