import { act } from '@testing-library/react-native';

/* Setups */
import { mockOpenCamera, mockOpenPicker } from '../../../../../jest.setup';
import { getMockStoreUseImage, renderUseImage } from '../../../../setups';

/* Mocks */
import { deniedStateMock, grantedStateMock, imageMock, initialStatusStateMock, unavailableStateMock } from '../../../../mocks';

describe('Test in useImage hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return respective props', () => {
        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.useImage).toEqual({
            image: {},
            setImage: expect.any(Function),
            deleteImage: expect.any(Function),
            takeImageToGallery: expect.any(Function),
            takePhoto: expect.any(Function),
            uploadImage: expect.any(Function)
        });
    });

    it('should get image with takeImageToGallery', async () => {
        mockOpenPicker.mockResolvedValue(imageMock);

        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        console.log(mockOpenPicker.mock);

        /* Check if openPicker is called one time and image is equal to mock */
        expect(mockOpenPicker).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageMock);
    });

    it('should not access to gallery when permission is denied', async () => {
        const mockStore = getMockStoreUseImage({ permissions: deniedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker isnt called and image is empty */
        expect(mockOpenPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });

    it('should not access to gallery when permission is unavailable', async () => {
        const mockStore = getMockStoreUseImage({ permissions: unavailableStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takeImageToGallery();
        });

        /* Check if openPicker isnt called and image is empty */
        expect(mockOpenPicker).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });

    it('should get image with takePhoto', async () => {
        mockOpenCamera.mockResolvedValue(imageMock);

        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takePhoto();
        });

        /* Check if openCamera is called one time and image is equal to mock */
        expect(mockOpenCamera).toHaveBeenCalledTimes(1);
        expect(result.current.useImage.image).toEqual(imageMock);
    });

    it('should not access to camera when permission is denied', async () => {
        const mockStore = getMockStoreUseImage({ permissions: deniedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takePhoto();
        });

        /* Check if openCamera isnt called and image is empty */
        expect(mockOpenCamera).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });

    it('should not access to camera when permission is unavailable', async () => {
        const mockStore = getMockStoreUseImage({ permissions: unavailableStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.takePhoto();
        });

        /* Check if openCamera isnt called and image is empty */
        expect(mockOpenCamera).not.toHaveBeenCalled();
        expect(result.current.useImage.image).toEqual({});
    });
});