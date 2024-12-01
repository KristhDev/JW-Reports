import { useEffect } from 'react';
import { AppState } from 'react-native';
import { Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

import '@config/unistyles';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Providers */
import { Provider } from '@providers';

/* Services */
import { EmailService, LoggerService } from '@domain/services';
import { NotificationsService } from '@services';

/* Modules */
import { useTheme } from '@theme';
import { useAuth } from '@auth';
import { useCourses } from '@courses';
import { useLessons } from '@lessons';
import { StatusModal, useNetwork, usePermissions } from '@shared';
import { usePreaching } from '@preaching';
import { useRevisits } from '@revisits';
import { useUI } from '@ui';

/* Global config of date util */
Time.extend(Time.plugins.weekday);
Time.setLocale(Time.locale.es);

if (__DEV__) require('../../ReactotronConfig');

const Navigation = (): JSX.Element => {
  const { theme: { colors }  } = useStyles();

  const { getAuth } = useAuth();
  const { clearCourses } = useCourses();
  const { clearLessons } = useLessons();
  const { state, checkPermissions, requestPermissions } = usePermissions();
  const { clearPreaching } = usePreaching();
  const { clearRevisits } = useRevisits();
  const { state: { theme } } = useTheme();
  const { wifi } = useNetwork();
  const { listenHideKeyboard, listenShowKeyboard } = useUI();

  /**
   * Effect to clear store when mount component.
   */
  useEffect(() => {
    if (wifi.hasConnection) {
      clearCourses();
      clearLessons();
      clearPreaching();
      clearRevisits();

      getAuth();
    }
  }, []);

  /**
   * Effect to check or request permissions.
   */
  useEffect(() => {
    if (state.isPermissionsRequested) checkPermissions();
    else requestPermissions({ notifications: true });
  }, []);

  /**
   * Effect to listen keyboard.
   */
  useEffect(() => {
    const showListener = listenShowKeyboard();
    const hideListener = listenHideKeyboard();

    return () => {
      showListener.remove();
      hideListener.remove();
    }
  }, []);

  /**
   * Effect to check permissions when change AppState.
   */
  useEffect(() => {
    const unSubscribreAppState = AppState.addEventListener('change', async (state) => {
      if (state !== 'active') return;
      checkPermissions();
    });

    return () => {
      unSubscribreAppState.remove();
    }
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarAnimation: 'fade',
          statusBarBackgroundColor: colors.contentHeader,
          statusBarStyle: (theme === 'dark') ? 'light' : 'dark',
      }}
    >
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" />
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default function RootLayout(): JSX.Element {
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

  return (
    <Provider>
      <StatusModal />
      <Navigation />
    </Provider>
  );
}
