/* Setups */
import { getMockStoreUseImage, renderUseImage } from '@setups';

/* Mocks */
import { CloudServiceSpy, grantedStateMock, imageModelMock, initialStatusStateMock } from '@mocks';

/* Errors */
import { CloudError } from '@domain/errors';

const mockStore = getMockStoreUseImage({ permissions: grantedStateMock, status: initialStatusStateMock });

const imageUrl = 'http://placeimg.com/640/480/city';
const folder = 'test';

describe('Test in useImage hook - uploadImage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call CloudService.uploadImage with respective params', async () => {
        CloudServiceSpy.uploadImage.mockResolvedValueOnce(imageUrl);

        const { result } = renderUseImage(mockStore);
        const imageUri = await result.current.useImage.uploadImage(imageModelMock, folder);

        expect(imageUri).toEqual(imageUrl);
        expect(CloudServiceSpy.uploadImage).toHaveBeenCalledTimes(1);
        expect(CloudServiceSpy.uploadImage).toHaveBeenCalledWith({ bucket: expect.any(String), folder, image: imageModelMock });
    });

    it('should fail because CloudService.uploadImage throws an error', async () => {
        CloudServiceSpy.uploadImage.mockRejectedValue(new CloudError('Failed to upload image', 400));

        const { result } = renderUseImage(mockStore);

        try {
            const resultUrl = await result.current.useImage.uploadImage(imageModelMock, folder);
            expect(false).toBeTruthy();
        } 
        catch (error) {
            expect(error).toBeInstanceOf(CloudError);
            expect(error).toHaveProperty('message', 'Failed to upload image');
            expect(error).toHaveProperty('status', 400);

            expect(CloudServiceSpy.uploadImage).toHaveBeenCalledTimes(1);
            expect(CloudServiceSpy.uploadImage).toHaveBeenCalledWith({ bucket: expect.any(String), folder, image: imageModelMock });
        }
    });
});