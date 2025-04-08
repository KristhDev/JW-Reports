import { useEffect } from 'react';
import { AppState } from 'react-native';
import { Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

import '@config/i18n';
import '@config/unistyles';

/* Config */
import { emailService, localizationAdapter, loggerService, notificationsService } from '@config/di';

/* Constants */
import { languagesCodes, validLanguagesCodes } from '@application/constants/utils';

/* Adapters */
import { TimeAdapter } from '@infrastructure/adapters';

/* Interfaces */
import { Languages } from '@infrastructure/interfaces';

/* Providers */
import { Provider } from '@providers';

/* Modules */
import { useAuth } from '@auth/hooks';
import { useCourses } from '@courses/hooks';
import { useLessons } from '@lessons/hooks';
import { usePreaching } from '@preaching/hooks';
import { useRevisits } from '@revisits/hooks';
import { useNetwork, usePermissions } from '@shared/hooks';
import { useTheme } from '@theme/hooks';
import { useTranslation, useUI } from '@ui/hooks';

/* Global config of time util */
TimeAdapter.extend(TimeAdapter.plugins.weekday);

if (__DEV__) require('../ReactotronConfig');

const Navigation = (): JSX.Element => {
  const { theme: { colors } } = useStyles();

  const { state: { isAuthenticated }, getAuth } = useAuth();
  const { clearCourses } = useCourses();
  const { clearLessons } = useLessons();
  const { checkPermissions } = usePermissions();
  const { clearPreaching } = usePreaching();
  const { clearRevisits } = useRevisits();
  const { state: { theme } } = useTheme();
  const { wifi } = useNetwork();
  const { changeLanguage } = useTranslation();
  const { state: { userInterface }, listenHideKeyboard, listenShowKeyboard } = useUI();

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
   * Effect to set language of app.
   */
  useEffect(() => {
    const deviceLangue = localizationAdapter.getCurrentLanguageCode();

    let language = languagesCodes.EN;
    if (userInterface?.language) language = userInterface.language;

    if (!userInterface.language && validLanguagesCodes.includes(deviceLangue as any)) {
      language = deviceLangue as Languages;
    }

    const timeLocale = TimeAdapter.locale[language as keyof typeof TimeAdapter.locale];

    changeLanguage(language);
    TimeAdapter.setLocale(timeLocale);
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
        animation: 'fade_from_bottom',
        contentStyle: { backgroundColor: colors.background },
        headerShown: false,
        statusBarAnimation: 'fade',
        statusBarBackgroundColor: colors.contentHeader,
        statusBarStyle: (theme === 'dark') ? 'light' : 'dark',
      }}
    >
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" />

      <Stack.Screen
        name="modal"
        options={{
          animation: 'fade',
          contentStyle: { backgroundColor: 'transparent' },
          presentation: 'transparentModal',
          statusBarBackgroundColor: (isAuthenticated) ? colors.header : colors.contentHeader
        }}
      />
    </Stack>
  );
}

export default function RootLayout(): JSX.Element {
  /**
   * Effect to mount service for notifications.
   */
  useEffect(() => {
    notificationsService.mount();
  }, []);

  /**
   * Effect to initialize logger
   */
  useEffect(() => {
    loggerService.init();
  }, []);

  /**
   * Effect to initialize email
   */
  useEffect(() => {
    emailService.init();
  }, []);

  return (
    <Provider>
      <Navigation />
    </Provider>
  );
}
