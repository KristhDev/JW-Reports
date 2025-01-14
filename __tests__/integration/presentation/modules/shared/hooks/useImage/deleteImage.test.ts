import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseImage, renderUseImage } from '@setups';

/* Mocks */
import { CloudServiceSpy, grantedStateMock, initialStatusStateMock } from '@mocks';

/* Errors */
import { CloudError } from '@domain/errors';

const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });

const imageUrl = 'http://placeimg.com/640/480/city';
const folder = 'test';

describe('Test in useImage hook - deleteImage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call CloudService.deleteImage with respective params', async () => {
        CloudServiceSpy.deleteImage.mockImplementation(() => Promise.resolve());

        const { result } = renderUseImage(mockStore);

        await act(async () => {
            await result.current.useImage.deleteImage(imageUrl, folder);
        });

        expect(CloudServiceSpy.deleteImage).toHaveBeenCalledTimes(1);
        expect(CloudServiceSpy.deleteImage).toHaveBeenCalledWith({ bucket: expect.any(String), folder, uri: imageUrl });
    });

    it('should fail because CloudService.deleteImage throws an error', async () => {
        CloudServiceSpy.deleteImage.mockRejectedValue(new CloudError('Image not stored', 400));

        const { result } = renderUseImage(mockStore);

        await act(async () => {
            try {
                await result.current.useImage.deleteImage(imageUrl, folder);
            } 
            catch (error) {
                expect(error).toBeInstanceOf(CloudError);
                expect(error).toHaveProperty('message', 'Image not stored');
                expect(error).toHaveProperty('status', 400);

                expect(CloudServiceSpy.deleteImage).toHaveBeenCalledTimes(1);
                expect(CloudServiceSpy.deleteImage).toHaveBeenCalledWith({ bucket: expect.any(String), folder, uri: imageUrl });
            }
        });
    });
});