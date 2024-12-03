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
                resizeMode: 'contain',
                dark: {
                    backgroundColor: darkColors.contentHeader
                }
            }
        ],
        [
            'onesignal-expo-plugin',
            {
                mode: 'development'
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
    experiments: {
        typedRoutes: true
    }
});

export default config;