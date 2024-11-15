import { Image, Share } from 'react-native';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

import 'react-native-gesture-handler/jestSetup';
import 'react-native-url-polyfill/auto';
import '@config/unistyles';

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

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-native-community/netinfo', () =>
    require('@react-native-community/netinfo/jest/netinfo-mock.js')
);

export const mockRNVoice = {
    destroy: jest.fn(),
    onSpeechEnd: jest.fn(),
    onSpeechError: jest.fn(),
    onSpeechResults: jest.fn(),
    onSpeechStart: jest.fn(),
    removeAllListeners: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
}

jest.mock('@react-native-voice/voice', () => mockRNVoice);

jest.mock('reduxjs-toolkit-persist', () => {
    const real = jest.requireActual('reduxjs-toolkit-persist');

    return {
        ...real,
        persistReducer: jest
            .fn()
            .mockImplementation((config, reducers) => reducers)
    }
});

export const mockUseNavigation = {
    addListener: jest.fn(),
    getState: jest.fn().mockImplementation(() => ({ index: 1, routeNames: ['ListScreen'] })),
    goBack: jest.fn(),
    isFocused: jest.fn().mockImplementation(() => true),
    navigate: jest.fn(),
    removeListener: jest.fn()
}

jest.mock('@react-navigation/native', () => {
    const actual = jest.requireActual('@react-navigation/native');

    return {
        ...actual,
        useFocusEffect: () => jest.fn().mockImplementation(callback => callback()),
        useNavigation: () => mockUseNavigation,
        useRoute: () => ({
            name: 'LessonDetailScreen'
        })
    }
});

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('react-native-fs', () => ({
    DownloadDirectoryPath: '/storage/emulated/0/Download',
    moveFile: jest.fn()
}));

jest.mock('react-native-system-navigation-bar', () => {
    const real = jest.requireActual<typeof import('react-native-system-navigation-bar')>('react-native-system-navigation-bar');
    real.default.setNavigationColor = jest.fn();

    return real;
});

jest.mock('react-native-html-to-pdf', () => ({
    convert: jest.fn()
}));

jest.mock('react-native-image-crop-picker', () => ({
    clean: jest.fn(),
    openCamera: jest.fn(),
    openPicker: jest.fn(),
}));

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