// import env from '@expo/env';
// env.load(process.cwd());

import { Image, Share } from 'react-native';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

import 'react-native-gesture-handler/jestSetup';
import 'react-native-url-polyfill/auto';
import '@shopify/flash-list/jestSetup';

import '@config/unistyles';

// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native/js-polyfills');


jest.spyOn(Image, 'resolveAssetSource').mockImplementation(() => ({
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTar_ouGael5ODlrC1kbFbKLpEPSJtTQqdaIg&s',
    width: 300,
    height: 180,
    scale: 1
}));

export const shareSpy = jest.spyOn(Share, 'share');

jest.mock('@bugfender/rn-bugfender', () => {
    const real = jest.requireActual<typeof import('@bugfender/rn-bugfender')>('@bugfender/rn-bugfender');

    return {
        ...real,
        Bugfender: {
            init: jest.fn(),
            sendLog: jest.fn()
        }
    }
});

/**
 * Aunque en el proyecto no tenga instalado este paquete es una dependencia de
 * @emailjs/react-native por lo que es necesario aplicar un mock
 */
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@emailjs/react-native', () => {
    const real = jest.requireActual<typeof import('@emailjs/react-native')>('@emailjs/react-native');

    return {
        ...real,
        init: jest.fn(),
        send: jest.fn(),
        sendForm: jest.fn(),
        default: {
            init: jest.fn(),
            send: jest.fn(),
            sendForm: jest.fn()
        }
    }
});

jest.mock('@react-native-community/netinfo', () =>
    require('@react-native-community/netinfo/jest/netinfo-mock.js')
);

jest.mock('expo-application', () => ({
    getBuildVersion: jest.fn().mockReturnValue('1'),
    getSystemVersion: jest.fn().mockReturnValue('1.0.0')
}))

jest.mock('expo-file-system', () => ({
    EncodingType: {
        Base64: 'base64',
        UTF8: 'utf8'
    },
    deleteAsync: jest.fn(),
    readAsStringAsync: jest.fn().mockResolvedValue('data-base64-string'),
    moveAsync: jest.fn(),
    StorageAccessFramework: {
        requestDirectoryPermissionsAsync: jest.fn().mockResolvedValue({
            directoryUri: '/storage/emulated/0/Download/Downloads',
            granted: true
        }),
        createFileAsync: jest.fn().mockResolvedValue('/storage/emulated/0/Download/Downloads/file.txt'),
        writeAsStringAsync: jest.fn()
    }
}));

jest.mock('expo-image-picker', () => ({
    launchCameraAsync: jest.fn().mockResolvedValue({
        canceled: false,
        assets: [
            {
                base64: 'data-base64-string',
                mimeType: 'image/jpeg',
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTar_ouGael5ODlrC1kbFbKLpEPSJtTQqdaIg&s',
                height: 180,
                width: 300
            }
        ]
    }),

    launchImageLibraryAsync: jest.fn().mockResolvedValue({
        canceled: false,
        assets: [
            {
                base64: 'data-base64-string',
                mimeType: 'image/jpeg',
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTar_ouGael5ODlrC1kbFbKLpEPSJtTQqdaIg&s',
                height: 180,
                width: 300
            }
        ]
    })
}));

jest.mock('expo-print', () => ({
    printToFileAsync: jest.fn().mockResolvedValue({
        uri: 'file:///storage/emulated/0/Android/data/com.kristhdev.jwreports/Print/file.pdf'
    })
}));

jest.mock('expo-speech-recognition', () => ({
    ExpoSpeechRecognitionModule: {
        removeAllListeners: jest.fn(),
        addListener: jest.fn(),
        start: jest.fn(),
        stop: jest.fn()
    }
}));

jest.mock('reduxjs-toolkit-persist', () => {
    const real = jest.requireActual('reduxjs-toolkit-persist');

    return {
        ...real,
        persistReducer: jest
            .fn()
            .mockImplementation((config, reducers) => reducers)
    }
});

jest.mock('react-native-keyboard-controller', () =>
    require('react-native-keyboard-controller/jest'),
);

jest.mock('react-native-onesignal', () => {
    const real = jest.requireActual<typeof import('react-native-onesignal')>('react-native-onesignal');

    return{
        ...real,
        OneSignal: {
            Debug: {
                setLogLevel: jest.fn()
            },
            initialize: jest.fn(),
            Notifications: {
                requestPermission: jest.fn()
            },
            login: jest.fn(),
            logout: jest.fn()
        }
    }
});

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native-unistyles', () => {
    const real = jest.requireActual('react-native-unistyles');

    return {
        ...real,
        UnistylesRuntime: {
            colorScheme: 'dark',
            setTheme: jest.fn(),
            themeName: 'dark',
        }
    }
});

jest.mock('reactotron-react-native', () => ({
    configure: () => ({
        useReactNative: () => ({
            use: () => ({
                use: () => ({
                    use: () => ({
                        use: () => ({
                            connect: () => jest.fn()
                        })
                    })
                })
            })
        })
    }),
    openInEditor: jest.fn(),
    useReactNative: jest.fn(),
    use: jest.fn(),
    connect: jest.fn(),
    asyncStorage: jest.fn(),
    trackGlobalErrors: jest.fn()
}));

jest.mock('reactotron-redux', () => ({
    reactotronRedux: jest.fn()
}));

jest.mock('reactotron-react-native-mmkv', () => jest.fn());

jest.setTimeout(100 * 1000);