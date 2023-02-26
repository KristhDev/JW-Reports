import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-onesignal', () => ({
    setLogLevel: jest.fn(),
    setAppId: jest.fn(),
    promptForPushNotificationsWithUserResponse: jest.fn(),
    setNotificationWillShowInForegroundHandler: jest.fn().mockImplementation(() => ({
        thengetNotification: jest.fn(),
        complete: jest.fn()
    })),
    setExternalUserId: jest.fn(),
    removeExternalUserId: jest.fn(),
}));

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    return {
        KeyboardAwareScrollView: jest
            .fn()
            .mockImplementation(({ children }) => children)
    }
})

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => {};

    return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-url-polyfill');

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('reduxjs-toolkit-persist', () => {
    const real = jest.requireActual('reduxjs-toolkit-persist');
    return {
        ...real,
        persistReducer: jest
            .fn()
            .mockImplementation((config, reducers) => reducers),
    };
});

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

jest.mock('react-native-image-crop-picker', () => ({
    openPicker: jest.fn(),
    openCamera: jest.fn()
}));

export const addListenerNavigateMock = jest.fn();
export const getStateNavigateMock = jest.fn().mockImplementation(() => ({ index: 1 }));
export const navigateMock = jest.fn();
export const removeListenerNavigateMock = jest.fn();

jest.doMock('@react-navigation/native', () => {
    const actual = jest.requireActual('@react-navigation/native');

    return {
        ...actual,
        useNavigation: () => ({
            addListener: addListenerNavigateMock,
            getState: getStateNavigateMock,
            navigate: navigateMock,
            removeListener: removeListenerNavigateMock,
        })
    }
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
