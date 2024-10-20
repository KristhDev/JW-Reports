import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import '@config/unistyles';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Providers */
import { Provider } from '@providers';

/* Navigation */
import { Navigation } from '@navigation';

/* Services */
import { EmailService, LoggerService, NotificationsService } from '@services';

/* Global config of date util */
Time.extend(Time.plugins.weekday);
Time.setLocale(Time.locale.es);

/**
 * This is the entry point of the app that renders all the necessary
 * parts for its operation.
 */
const App = () => {
  /**
   * Effect to mount service for notifications.
   */
  useEffect(() => {
    NotificationsService.mount();
  }, []);

  /**
   * Effect to initialize logger
   */
  useEffect(() => {
    LoggerService.init();
  }, []);

  /**
   * Effect to initialize email
   */
  useEffect(() => {
    EmailService.init();
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