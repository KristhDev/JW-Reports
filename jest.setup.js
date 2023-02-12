import 'react-native-gesture-handler/jestSetup';

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
