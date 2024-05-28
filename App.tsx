import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/es';

import './src/config/unistyles';

/* Providers */
import { Provider } from './src/providers';

/* Navigation */
import { Navigation } from './src/navigation';

/* Services */
import { logger, notifications } from './src/services';

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
  /**
   * Effect to mount service for notifications.
   */
  useEffect(() => {
    notifications.mount();
  }, []);

  /**
   * Effect to initialize logger
   */
  useEffect(() => {
    logger.init();
  }, []);

  /**
   * Effect to hide splash screen
   */
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;