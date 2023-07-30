import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

/* Env */
import { ONESIGNAL_APP_ID } from '@env';

/* Features */
import { store, persistor } from './src/features/store';

/* Context */
import { ThemeProvider } from './src/theme/context';
import { NetworkProvider } from './src/context/network';

/* Navigation */
import { Navigation } from './src/navigation';

/* Global config of dayjs */
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
    ONESIGNAL_APP_ID;
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(ONESIGNAL_APP_ID);

    /**
     * A method that shows a native prompt to the user asking for permission to send
     * notificationspush notifications.
     */
    OneSignal.promptForPushNotificationsWithUserResponse();

    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      const notification = notificationReceivedEvent.getNotification();
      notificationReceivedEvent.complete(notification);
    });
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