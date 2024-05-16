import { Image } from 'react-native-image-crop-picker';

export const takeImageToGalleryMock = jest.fn();
export const takePhotoMock = jest.fn();

export const imageMock: Image = {
    height: 200,
    mime: 'image/jpeg',
    path: 'path/to/image.jpg',
    size: 200,
    width: 200,
}