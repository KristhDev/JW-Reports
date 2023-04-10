import React from 'react';
import { act, renderHook } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { Image } from 'react-native-image-crop-picker';
import { configureStore } from '@reduxjs/toolkit';

/* Features */
import { deniedState, grantedState, unavailableState } from '../features/permissions';
import { initialState as statusInitState } from '../features/status';
import { permissionsReducer } from '../../src/features/permissions';
import { statusReducer } from '../../src/features/status';

/* Hooks */
import { useImage, usePermissions, useStatus, useTheme } from '../../src/hooks';

/* Interfaces */
import { PermissionsState } from '../../src/interfaces/permissions';
import { StatusState } from '../../src/interfaces/status';

/* Theme */
import { darkColors } from '../../src/theme/colors';

/* Setup */
import { openCameraMock, openPickerMock } from '../../jest.setup';

/* Mock hooks */
jest.mock('../../src/hooks/useTheme.ts');

/* The `interface InitialState` is defining the shape of an object that has two properties:
`permissions` and `status`. These properties are expected to be of types `PermissionsState` and
`StatusState` respectively. This interface is used to create a mock store in the `getMockStore`
function, which is then passed as a prop to the `Provider` component in the `render` function. */
interface InitialState {
    permissions: PermissionsState;
    status: StatusState;
}

/* `mockImage` is a mock object that simulates an image object returned by the
`react-native-image-crop-picker` library. It has properties such as `height`, `mime`, `path`,
`size`, and `width` that are commonly found in image objects. This object is used in the test cases
to simulate the behavior of the `takeImageToGallery` and `takePhoto` functions in the `useImage`
hook. */
const mockImage: Image = {
    height: 200,
    mime: 'image/jpeg',
    path: 'path/to/image.jpg',
    size: 200,
    width: 200,
}

/**
 * The function returns a configured Redux store with preloaded state for permissions and status
 * reducers.
 * @param {InitialState}  - The `getMockStore` function takes an object with two properties as its
 * parameter: `permissions` and `status`. These properties represent the initial state of the
 * `permissions` and `status` slices of the Redux store. The function returns a configured Redux store
 * with the initial state set to the values passed
 * @returns The function `getMockStore` is returning a configured Redux store with two reducers
 * (`permissionsReducer` and `statusReducer`) and an initial state object containing `permissions` and
 * `status` properties. The initial state is passed as `preloadedState` to the `configureStore`
 * function from the Redux Toolkit library.
 */
const getMockStore = ({ permissions, status }: InitialState) => {
    return configureStore({
        reducer: {
            permissions: permissionsReducer,
            status: statusReducer
        },
        preloadedState: {
            permissions: { ...permissions },
            status: { ...status }
        }
    });
}

/**
 * This function renders a React component with hooks for image, permissions, and status using a
 * provided store.
 * @param {any} store - The `store` parameter is an object that represents the Redux store. It contains
 * the state of the application and provides methods to update the state through dispatching actions.
 * The `render` function is using this store to wrap the components being rendered with a Redux
 * Provider, so that they can access the store
 * @returns The `render` function is returning the result of calling the `renderHook` function with an
 * object containing three properties: `useImage`, `usePermissions`, and `useStatus`. These properties
 * are the results of calling their respective functions. The `renderHook` function is being called
 * with an options object that includes a `wrapper` property, which is a function that returns a
 * `Provider` component
 */
const render = (store: any) => {
    return renderHook(() => ({
        useImage: useImage(),
        usePermissions: usePermissions(),
        useStatus: useStatus()
    }),
    {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}

describe('Test in useImage hook', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return respective props', () => {
        const mockStore = getMockStore({ permissions: grantedState, status: statusInitState });
        const { result } = render(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.useImage).toEqual({
            image: {},
            setImage: expect.any(Function),
            takeImageToGallery: expect.any(Function),
            takePhoto: expect.any(Function),
            uploadImage: expect.any(Function),
            deleteImage: expect.any(Function)
        });
    });

    it('should get image with takeImageToGallery', async () => {
        openPickerMock.mockImplementation(() => Promise.resolve(mockImage));

        const mockStore = getMockStore({ permissions: grantedState, status: statusInitState });
        const { result } = render(mockStore);

        await act(() => {
            result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker is called one time and image is equal to mock */
        expect(openPickerMock).toBeCalledTimes(1);
        expect(result.current.useImage.image).toEqual(mockImage);
    });

    it('should not access to gallery when permission is denied', async () => {
        const mockStore = getMockStore({ permissions: deniedState, status: statusInitState });

        const { result } = render(mockStore);

        await act(async () => {
            result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker isnt called and image is empty */
        expect(openPickerMock).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });

    it('should not access to gallery when permission is unavailable', async () => {
        const mockStore = getMockStore({ permissions: unavailableState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker isnt called and image is empty */
        expect(openPickerMock).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });

    it('should get image with takePhoto', async () => {
        openCameraMock.mockImplementation(() => Promise.resolve(mockImage));

        const mockStore = getMockStore({ permissions: grantedState, status: statusInitState });
        const { result } = render(mockStore);

        await act(() => {
            result.current.useImage.takePhoto();
        });

        /* Check if openCamera is called one time and image is equal to mock */
        expect(openCameraMock).toBeCalledTimes(1);
        expect(result.current.useImage.image).toEqual(mockImage);
    });

    it('should not access to camera when permission is denied', async () => {
        const mockStore = getMockStore({ permissions: deniedState, status: statusInitState });

        const { result } = render(mockStore);

        await act(async () => {
            result.current.useImage.takePhoto();
        });

        /* Check if openCamera isnt called and image is empty */
        expect(openCameraMock).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });

    it('should not access to camera when permission is unavailable', async () => {
        const mockStore = getMockStore({ permissions: unavailableState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            result.current.useImage.takePhoto();
        });

        /* Check if openCamera isnt called and image is empty */
        expect(openCameraMock).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });
});