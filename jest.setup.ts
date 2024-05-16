import 'react-native-gesture-handler/jestSetup';
import 'react-native-url-polyfill/auto';

import { breakpoints as mockBreakpoints, darkColors as mockDarkColors, fontSizes as mockFontSizes, margins as mockMargins } from './src/modules/theme';

export const onCancelMock = jest.fn();
export const onChangeValueMock = jest.fn();
export const onCleanMock = jest.fn();
export const onCloseMock = jest.fn();
export const onCofirmMock = jest.fn();
export const onFinishMock = jest.fn();
export const onPressMock = jest.fn();
export const onSearchMock = jest.fn();
export const onToggleMock = jest.fn();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-native-community/netinfo', () =>
    require('@react-native-community/netinfo/jest/netinfo-mock.js')
);

jest.mock('reduxjs-toolkit-persist', () => {
    const real = jest.requireActual('reduxjs-toolkit-persist');

    return {
        ...real,
        persistReducer: jest
            .fn()
            .mockImplementation((config, reducers) => reducers)
    }
});

export const useNavigationMock = {
    addListener: jest.fn(),
    getState: jest.fn().mockImplementation(() => ({ index: 1, routeNames: ['ListScreen'] })),
    goBack: jest.fn(),
    isFocused: jest.fn().mockImplementation(() => true),
    navigate: jest.fn(),
    removeListener: jest.fn()
}

jest.doMock('@react-navigation/native', () => {
    const actual = jest.requireActual('@react-navigation/native');

    return {
        ...actual,
        useNavigation: () => useNavigationMock,

        useRoute: () => ({
            name: 'LessonDetailScreen'
        })
    }
});

jest.mock('react-native-system-navigation-bar', () => {
    const real = jest.requireActual<typeof import('react-native-system-navigation-bar')>('react-native-system-navigation-bar');
    real.default.setNavigationColor = jest.fn();

    return real;
});

export const mockOpenPicker = jest.fn();
export const mockOpenCamera = jest.fn();

jest.mock('react-native-image-crop-picker', () => {
    return {
        openPicker: mockOpenPicker,
        openCamera: mockOpenCamera
    }
});

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    return {
        KeyboardAwareScrollView: jest
            .fn()
            .mockImplementation(({ children }) => children)
    }
});

jest.mock('react-native-onesignal', () => ({
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
}));

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => { }

    return Reanimated;
});

jest.mock('react-native-safe-area-context', () => {
    const actual = jest.requireActual('react-native-safe-area-context');

    return {
        ...actual,
        useSafeAreaInsets: () => ({
            top: 30
        })
    }
});

export const mockUnistylesSetTheme = jest.fn();

jest.mock('react-native-unistyles', () => {
    const real = jest.requireActual('react-native-unistyles');

    return {
        ...real,
        useStyles: (stylesheet: any) => {
            return {
                breakpoints: mockBreakpoints,
                styles: stylesheet,
                theme: {
                    colors: mockDarkColors,
                    margins: mockMargins,
                    fontSizes: mockFontSizes
                },
            }
        },
        createStyleSheet: (callback: Object | Function) => {
            if (typeof callback === 'object') return callback;

            return callback({
                colors: {
                    background: '#000000',
                    bottom: '#292929',
                    button: '#C0A7E1',
                    buttonDark: '#9C85B9',
                    buttonTranslucent: 'rgba(192, 167, 225, 0.50)',
                    buttonTransparent: 'rgba(255, 255, 255, 0.15)',
                    card: '#292929',
                    contentHeader: '#121212',
                    focus: '#D8981A',
                    header: '#292929',
                    headerText: '#FFFFFF',
                    icon: '#BFBFBF',
                    inputText: '#FFFFFF',
                    linkText: '#A0B9E2',
                    modal: '#292929',
                    modalText: '#B4B4B4',
                    navbar: '#000000',
                    text: '#FFFFFF',
                    titleSecondary: '#93A8AB',
                    titleText: '#FFFFFF',
                },
                fontSizes: {
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48,

                    icon: 25
                },
                margins: {
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48,
                    xxxl: 56
                }
            });
        },
        colorScheme: 'dark',
        setTheme: mockUnistylesSetTheme,
        themeName: 'dark',
    }
});

jest.mock('reactotron-react-native', () => ({
    setAsyncStorageHandler: () => ({
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
    }),
    openInEditor: jest.fn(),
    configure: jest.fn(),
    useReactNative: jest.fn(),
    use: jest.fn(),
    connect: jest.fn(),
    asyncStorage: jest.fn(),
    trackGlobalErrors: jest.fn()
}));

jest.mock('reactotron-redux', () => ({
    reactotronRedux: jest.fn()
}));

jest.setTimeout(100 * 1000);