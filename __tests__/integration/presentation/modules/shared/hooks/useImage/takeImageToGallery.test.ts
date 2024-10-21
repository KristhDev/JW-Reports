import { act } from '@testing-library/react-native';
import { request } from 'react-native-permissions';
import { openPicker } from 'react-native-image-crop-picker';

/* Setups */
import { mockDeviceInfo } from '@test-setup';
import { getMockStoreUseImage, renderUseImage } from '@setups';

/* Mocks */
import { blockedStateMock, deniedStateMock, grantedStateMock, imageMock, initialStatusStateMock, unavailableStateMock } from '@mocks';

/* Shared */
import { permissionsMessages, permissionsStatus } from '@shared';

describe('Test in useImage hook - takeImageToGallery', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should take image to gallery', async () => {
        (openPicker as jest.Mock).mockResolvedValue(imageMock);
        mockDeviceInfo.getSystemVersion.mockImplementation(() => '12');

        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker is called one time and image is equal to mock */
        expect(openPicker).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageMock);
    });

    it('should not access to gallery if permission is blocked in android below 13', async () => {
        mockDeviceInfo.getSystemVersion.mockImplementation(() => '12');

        const mockStore = getMockStoreUseImage({
            permissions: {
                ...blockedStateMock,
                permissions: { ...blockedStateMock.permissions, readMediaImages: 'unavailable' }
            },
            status: initialStatusStateMock
        });

        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker isnt called and image is empty */
        expect(openPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();

        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.REQUEST,
            code: 401
        });
    });

    it('should request permissions if permission is denied in android below 13', async () => {
        (request as jest.Mock).mockResolvedValue(permissionsStatus.GRANTED);
        mockDeviceInfo.getSystemVersion.mockImplementation(() => '12');

        const mockStore = getMockStoreUseImage({
            permissions: {
                ...deniedStateMock,
                permissions: { ...deniedStateMock.permissions, readMediaImages: 'unavailable' }
            },
            status: initialStatusStateMock
        });

        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker is called one time and image is equal to mock */
        expect(request).toHaveBeenCalledTimes(1);
        expect(openPicker).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageMock);
    });

    it('should not access to gallery if permission is unavailable in android below 13', async () => {
        mockDeviceInfo.getSystemVersion.mockImplementation(() => '12');

        const mockStore = getMockStoreUseImage({ permissions: unavailableStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker isnt called and image is empty */
        expect(openPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();

        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.UNSUPPORTED,
            code: 418
        });
    });

    it('should not access to gallery if permission is blocked in android above 12', async () => {
        mockDeviceInfo.getSystemVersion.mockImplementation(() => '13');

        const mockStore = getMockStoreUseImage({
            permissions: {
                ...blockedStateMock,
                permissions: { ...blockedStateMock.permissions, readExternalStorage: 'unavailable' }
            },
            status: initialStatusStateMock
        });

        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker isnt called and image is empty */
        expect(openPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();

        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.REQUEST,
            code: 401
        });
    });

    it('should request permissions if permission is denied in android above 12', async () => {
        (request as jest.Mock).mockResolvedValue(permissionsStatus.GRANTED);
        mockDeviceInfo.getSystemVersion.mockImplementation(() => '13');

        const mockStore = getMockStoreUseImage({
            permissions: {
                ...deniedStateMock,
                permissions: { ...deniedStateMock.permissions, readExternalStorage: 'unavailable' }
            },
            status: initialStatusStateMock
        });

        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker is called one time and image is equal to mock */
        expect(request).toHaveBeenCalledTimes(1);
        expect(openPicker).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageMock);
    });

    it('should not access to gallery if permission is unavailable in android above 12', async () => {
        mockDeviceInfo.getSystemVersion.mockImplementation(() => '13');

        const mockStore = getMockStoreUseImage({
            permissions: {
                ...unavailableStateMock,
                permissions: { ...unavailableStateMock.permissions, readExternalStorage: 'denied' }
            },
            status: initialStatusStateMock
        });

        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker isnt called and image is empty */
        expect(openPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();

        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.UNSUPPORTED,
            code: 418
        });
    });
});