import { act } from '@testing-library/react-native';

/* Setups */
import { mockDeviceInfo, mockImageCropPicker } from '../../../../../jest.setup';
import { getMockStoreUseImage, renderUseImage } from '../../../../setups';

/* Mocks */
import { deniedStateMock, grantedStateMock, imageMock, initialStatusStateMock, unavailableStateMock } from '../../../../mocks';

mockDeviceInfo.getSystemVersion.mockImplementation(() => '12');

describe('Test in useImage hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return respective props', () => {
        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.useImage).toEqual({
            image: null,
            setImage: expect.any(Function),
            deleteImage: expect.any(Function),
            takeImageToGallery: expect.any(Function),
            takePhoto: expect.any(Function),
            uploadImage: expect.any(Function)
        });
    });

    it('should get image with takeImageToGallery', async () => {
        mockImageCropPicker.openPicker.mockResolvedValue(imageMock);
        mockDeviceInfo.getSystemVersion.mockImplementation(() => '12');

        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker is called one time and image is equal to mock */
        expect(mockImageCropPicker.openPicker).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageMock);
    });

    it('should not access to gallery when permission is denied in android below 13', async () => {
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

        /* Check if openPicker isnt called and image is empty */
        expect(mockImageCropPicker.openPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();
    });

    it('should not access to gallery when permission is unavailable in android below 13', async () => {
        mockDeviceInfo.getSystemVersion.mockImplementation(() => '12');

        const mockStore = getMockStoreUseImage({ permissions: unavailableStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker isnt called and image is empty */
        expect(mockImageCropPicker.openPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();
    });

    it('should not access to gallery when permission is denied in android above 12', async () => {
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

        /* Check if openPicker isnt called and image is empty */
        expect(mockImageCropPicker.openPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();
    });

    it('should not access to gallery when permission is unavailable in android above 12', async () => {
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
        expect(mockImageCropPicker.openPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();
    });

    it('should get image with takePhoto', async () => {
        mockImageCropPicker.openCamera.mockResolvedValue(imageMock);

        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takePhoto();
        });

        /* Check if openCamera is called one time and image is equal to mock */
        expect(mockImageCropPicker.openCamera).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageMock);
    });

    it('should not access to camera when permission is denied', async () => {
        const mockStore = getMockStoreUseImage({ permissions: deniedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takePhoto();
        });

        /* Check if openCamera isnt called and image is empty */
        expect(mockImageCropPicker.openCamera).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();
    });

    it('should not access to camera when permission is unavailable', async () => {
        const mockStore = getMockStoreUseImage({ permissions: unavailableStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takePhoto();
        });

        /* Check if openCamera isnt called and image is empty */
        expect(mockImageCropPicker.openCamera).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toBeNull();
    });
});