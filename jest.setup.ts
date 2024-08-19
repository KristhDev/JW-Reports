import 'react-native-gesture-handler/jestSetup';
import 'react-native-url-polyfill/auto';
import './src/config/unistyles';

import { Image } from 'react-native';

export const onCancelMock = jest.fn();
export const onChangeValueMock = jest.fn();
export const onCleanMock = jest.fn();
export const onCloseMock = jest.fn();
export const onCofirmMock = jest.fn();
export const onFinishMock = jest.fn();
export const onPressMock = jest.fn();
export const onSearchMock = jest.fn();
export const onToggleMock = jest.fn();

import * as useAuth from './src/modules/auth/hooks/useAuth';
import * as useCourses from './src/modules/courses/hooks/useCourses';
import * as useImage from './src/modules/shared/hooks/useImage';
import * as useLessons from './src/modules/lessons/hooks/useLessons';
import * as useNetwork from './src/modules/shared/hooks/useNetwork';
import * as usePermissions from './src/modules/shared/hooks/usePermissions';
import * as usePreaching from './src/modules/preaching/hooks/usePreaching';
import * as useRevisits from './src/modules/revisits/hooks/useRevisits';
import * as useStatus from './src/modules/shared/hooks/useStatus';
import * as useTheme from './src/modules/theme/hooks/useTheme';
import * as useUI from './src/modules/ui/hooks/useUI';

export const useAuthSpy = jest.spyOn(useAuth, 'default');
export const useCoursesSpy = jest.spyOn(useCourses, 'default');
export const useImageSpy = jest.spyOn(useImage, 'default');
export const useLessonsSpy = jest.spyOn(useLessons, 'default');
export const useNetworkSpy = jest.spyOn(useNetwork, 'default');
export const usePermissionsSpy = jest.spyOn(usePermissions, 'default');
export const usePreachingSpy = jest.spyOn(usePreaching, 'default');
export const useRevisitsSpy = jest.spyOn(useRevisits, 'default');
export const useStatusSpy = jest.spyOn(useStatus, 'default');
export const useThemeSpy = jest.spyOn(useTheme, 'default');
export const useUIspy = jest.spyOn(useUI, 'default');

jest.spyOn(Image, 'resolveAssetSource').mockImplementation(() => ({
    uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    width: 300,
    height: 180,
    scale: 1
}));

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

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

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
        useNavigation: () => mockUseNavigation,

        useRoute: () => ({
            name: 'LessonDetailScreen'
        })
    }
});

export const mockDeviceInfo = {
    getBuildNumber: jest.fn().mockImplementation(() => 9102),
    getSystemVersion: jest.fn().mockImplementation(() => '12')
}

jest.mock('react-native-device-info', () => ({
    getSystemVersion: () => mockDeviceInfo.getSystemVersion(),
    getBuildNumber: () => mockDeviceInfo.getBuildNumber()
}));

jest.mock('react-native-system-navigation-bar', () => {
    const real = jest.requireActual<typeof import('react-native-system-navigation-bar')>('react-native-system-navigation-bar');
    real.default.setNavigationColor = jest.fn();

    return real;
});

export const mockImageCropPicker = {
    openCamera: jest.fn(),
    openPicker: jest.fn()
}

jest.mock('react-native-image-crop-picker', () => ({
    openCamera: () => mockImageCropPicker.openCamera(),
    openPicker: () => mockImageCropPicker.openPicker()
}));

jest.mock('react-native-keyboard-controller', () =>
    require('react-native-keyboard-controller/jest'),
);

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
    Reanimated.default.call = () => {}

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
        UnistylesRuntime: {
            colorScheme: 'dark',
            setTheme: mockUnistylesSetTheme,
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