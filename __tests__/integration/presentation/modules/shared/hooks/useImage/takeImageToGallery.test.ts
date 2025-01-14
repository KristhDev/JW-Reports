import { act } from '@testing-library/react-native';

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
    unavailableStateMock,
} from '@mocks';

/* Constants */
import { permissionsMessages, permissionsStatus } from '@application/constants';

describe('Test in useImage hook - takeImageToGallery', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should take image to gallery', async () => {
        DeviceImageServiceSpy.openPicker.mockResolvedValueOnce(imageModelMock);

        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if DeviceImageServiceSpy.openPicker is called one time and image is equal to mock */
        expect(DeviceImageServiceSpy.openPicker).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageModelMock);
    });

    it('should request permissions if permission is denied', async () => {
        DeviceImageServiceSpy.openPicker.mockResolvedValueOnce(imageModelMock);
        DeviceImageServiceSpy.requestMediaLibraryPermission.mockResolvedValueOnce(permissionsStatus.GRANTED);

        const mockStore = getMockStoreUseImage({
            permissions: {
                ...deniedStateMock,
                permissions: { ...deniedStateMock.permissions, mediaLibrary: 'undetermined' }
            },
            status: initialStatusStateMock
        });

        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if DeviceImageServiceSpy.openPicker is called one time and image is equal to mock */
        expect(DeviceImageServiceSpy.openPicker).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageModelMock);
    });

    it('should not access to gallery if permission is blocked', async () => {
        const mockStore = getMockStoreUseImage({
            permissions: blockedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker isnt called and image is empty */
        expect(DeviceImageServiceSpy.openPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();

        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.REQUEST,
            code: 401
        });
    });

    it('should not access to gallery if permission is unavailable', async () => {
        const mockStore = getMockStoreUseImage({ permissions: unavailableStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if DeviceImageServiceSpy.openPicker isnt called and image is empty */
        expect(DeviceImageServiceSpy.openPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();

        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.UNSUPPORTED,
            code: 418
        });
    });
});