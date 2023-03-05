import React from 'react';
import { act, renderHook } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { Image } from 'react-native-image-crop-picker';

import { configureStore } from '@reduxjs/toolkit';

import { deniedState, grantedState, unavailableState } from '../features/permissions';
import { initialState as statusInitState } from '../features/status';
import { permissionsReducer } from '../../src/features/permissions';
import { statusReducer } from '../../src/features/status';

import { useImage, usePermissions, useStatus, useTheme } from '../../src/hooks';

import { PermissionsState } from '../../src/interfaces/permissions';
import { StatusState } from '../../src/interfaces/status';

import { darkColors } from '../../src/theme/colors';

import { openCameraMock, openPickerMock } from '../../jest.setup';

jest.mock('../../src/hooks/useTheme.ts');

interface InitialState {
    permissions: PermissionsState;
    status: StatusState;
}

const mockImage: Image = {
    height: 200,
    mime: 'image/jpeg',
    path: 'path/to/image.jpg',
    size: 200,
    width: 200,
}

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

        expect(openPickerMock).toBeCalledTimes(1);
        expect(result.current.useImage.image).toEqual(mockImage);
    });

    it('should not access to gallery when permission is denied', async () => {
        const mockStore = getMockStore({ permissions: deniedState, status: statusInitState });

        const { result } = render(mockStore);

        await act(async () => {
            result.current.useImage.takeImageToGallery();
        });

        expect(openPickerMock).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });

    it('should not access to gallery when permission is unavailable', async () => {
        const mockStore = getMockStore({ permissions: unavailableState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            result.current.useImage.takeImageToGallery();
        });

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

        expect(openCameraMock).toBeCalledTimes(1);
        expect(result.current.useImage.image).toEqual(mockImage);
    });

    it('should not access to camera when permission is denied', async () => {
        const mockStore = getMockStore({ permissions: deniedState, status: statusInitState });

        const { result } = render(mockStore);

        await act(async () => {
            result.current.useImage.takePhoto();
        });

        expect(openCameraMock).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });

    it('should not access to camera when permission is unavailable', async () => {
        const mockStore = getMockStore({ permissions: unavailableState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            result.current.useImage.takePhoto();
        });

        expect(openCameraMock).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });
});