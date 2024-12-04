import 'ts-node/register';
import { ExpoConfig, ConfigContext } from 'expo/config';

/* Theme */
import { darkColors, lightColors } from './src/presentation/modules/theme/styles/colors';

/* Package */
import { version } from './package.json';

const appId = 'com.kristhdev.jwreports';

const config = ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'JW Reports',
    slug: 'jw-reports',
    version,
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'jwreports',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
        bundleIdentifier: appId
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/images/adaptive-icon.png',
            backgroundColor: lightColors.button
        },
        package: appId,
        permissions: [
            'android.permission.CAMERA',
            'android.permission.READ_EXTERNAL_STORAGE',
            'android.permission.READ_MEDIA_IMAGES',
            'android.permission.RECORD_AUDIO',
            'android.permission.WRITE_EXTERNAL_STORAGE'
        ]
    },
    web: {
        bundler: 'metro',
        output: 'static',
        favicon: './assets/images/favicon.png'
    },
    plugins: [
        'expo-router',
        [
            'expo-splash-screen',
            {
                backgroundColor: lightColors.contentHeader,
                image: './assets/images/splash-icon.png',
                imageWidth: 200,
                dark: {
                    backgroundColor: darkColors.contentHeader
                }
            }
        ],
        [
            'onesignal-expo-plugin',
            {
                mode: 'development',
                smallIcons: [ './assets/notifications/ic_stat_onesignal_default.png' ],
                largeIcons: [ './assets/notifications/ic_onesignal_large_icon_default.png' ],
            }
        ],
        [
            'react-native-permissions',
            {
                iosPermissions: []
            }
        ],
        'expo-speech-recognition'
    ],
    extra: {
        eas: {
            projectId: '049c5d88-5f8d-4a05-8254-d87dfb408f25'
        }
    },
    experiments: {
        typedRoutes: true
    }
});

export default config;