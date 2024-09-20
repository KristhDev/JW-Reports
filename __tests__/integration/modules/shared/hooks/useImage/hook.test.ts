/* Setups */
import { getMockStoreUseImage, renderUseImage } from '@setups';

/* Mocks */
import { grantedStateMock, initialStatusStateMock } from '@mocks';

describe('Test in useImage hook', () => {
    it('should return respective functions and props', () => {
        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.useImage).toEqual({
            image: null,
            clearImage: expect.any(Function),
            deleteImage: expect.any(Function),
            setImage: expect.any(Function),
            takeImageToGallery: expect.any(Function),
            takePhoto: expect.any(Function),
            uploadImage: expect.any(Function),
        });
    });
});