import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import '@config/unistyles';

/* Providers */
import { Provider } from '@providers';

/* Navigation */
import { Navigation } from '@navigation';

/* Services */
import { logger, notifications } from '@services';

/* Utils */
import { date } from '@utils';

/* Global config of date util */
date.extend(date.plugins.weekday);
date.setLocale(date.locale.es);

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