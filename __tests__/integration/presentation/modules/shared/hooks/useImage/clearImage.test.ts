import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseImage, renderUseImage } from '@setups';

/* Mocks */
import { DeviceImageServiceSpy, grantedStateMock, imageModelMock, initialStatusStateMock } from '@mocks';

describe('Test in useImage - clearImage', () => {
    it('should clear image', async () => {
        DeviceImageServiceSpy.clean.mockImplementation(() => Promise.resolve());

        const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });
        const { result } = renderUseImage(mockStore);

        await act(() => {
            result.current.useImage.setImage(imageModelMock);
        });

        expect(result.current.useImage.image).toEqual(imageModelMock);

        await act(async () => {
            await result.current.useImage.clearImage();
        });

        expect(result.current.useImage.image).toBeNull();
    });
});