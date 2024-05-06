import React, { useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
import SplashScreen from 'react-native-splash-screen';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/es';

import './src/config/unistyles';

/* Providers */
import { Provider } from './src/providers';

/* Navigation */
import { Navigation } from './src/navigation';

/* Services */
import { notifications } from './src/services';

/* Utils */
import { date } from './src/utils';

/* Global config of date util */
date.extend(weekday);
date.setLocale('es');

/**
 * This is the entry point of the app that renders all the necessary
 * parts for its operation.
 */
const App = () => {
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  /**
   * Effect to listen for push notifications.
   */
  useEffect(() => {
    notifications.listen();
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