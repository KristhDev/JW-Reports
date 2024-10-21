import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseImage, renderUseImage } from '@setups';

/* Mocks */
import { grantedStateMock, imageMock, initialStatusStateMock } from '@mocks';

describe('Test in useImage - clearImage', () => {
    it('should clear image', async () => {
        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(() => {
            result.current.useImage.setImage(imageMock);
        });

        expect(result.current.useImage.image).toEqual(imageMock);

        await act(async () => {
            await result.current.useImage.clearImage();
        });

        expect(result.current.useImage.image).toBeNull();
    });
});