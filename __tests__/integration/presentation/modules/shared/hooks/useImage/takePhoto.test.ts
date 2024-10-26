import { act } from '@testing-library/react-native';
import { request } from 'react-native-permissions';

/* Setups */
import { getMockStoreUseImage, renderUseImage } from '@setups';

/* Mocks */
import {
    blockedStateMock,
    deniedStateMock,
    DeviceImageServiceSpy,
    grantedStateMock,
    imageModelMock,
    initialStatusStateMock,
    unavailableStateMock
} from '@mocks';

/* Shared */
import { permissionsMessages, permissionsStatus } from '@shared';

describe('Test in useImage hook - takePhoto', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should take photo', async () => {
        DeviceImageServiceSpy.openCamera.mockResolvedValueOnce(imageModelMock);

        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takePhoto();
        });

        /* Check if DeviceImageServiceSpy.openCamera is called one time and image is equal to mock */
        expect(DeviceImageServiceSpy.openCamera).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageModelMock);
    });

    it('should not access to camera if permission is blocked', async () => {
        const mockStore = getMockStoreUseImage({ permissions: blockedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takePhoto();
        });

        /* Check if DeviceImageServiceSpy.openCamera isnt called and image is empty */
        expect(DeviceImageServiceSpy.openCamera).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();
        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.REQUEST,
            code: 401
        });
    });

    it('should request camera permission if permission is denied', async () => {
        DeviceImageServiceSpy.openCamera.mockResolvedValueOnce(imageModelMock);
        (request as jest.Mock).mockResolvedValue(permissionsStatus.GRANTED);

        const mockStore = getMockStoreUseImage({ permissions: deniedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takePhoto();
        });

        /* Check if DeviceImageServiceSpy.openCamera is called one time and image is equal to mock */
        expect(request).toHaveBeenCalledTimes(1);
        expect(DeviceImageServiceSpy.openCamera).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageModelMock);
    });

    it('should not access to camera if permission is unavailable', async () => {
        const mockStore = getMockStoreUseImage({ permissions: unavailableStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takePhoto();
        });

        /* Check if DeviceImageServiceSpy.openCamera isnt called and image is empty */
        expect(DeviceImageServiceSpy.openCamera).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();

        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.UNSUPPORTED,
            code: 418
        });
    });
});