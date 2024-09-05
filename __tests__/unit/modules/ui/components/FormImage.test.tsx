import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onChangeValueMock, useImageSpy } from '@test-setup';

/* Mocks */
import { takeImageToGalleryMock, takePhotoMock } from '@mocks';

/* Modules */
import { FormImage } from '@ui';

const defaultImage = require('@assets/revisit-default.jpg');

const renderComponent = () => render(
    <FormImage
        defaultImage={ defaultImage }
        label="Imagen:"
        onSelectImage={ onChangeValueMock }
    />
);

const user = userEvent.setup();

useImageSpy.mockImplementation(() => ({
    image: null,
    takeImageToGallery: takeImageToGalleryMock,
    takePhoto: takePhotoMock,
}) as any);

describe('Test in <FormImage /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent();

        const label = screen.getByTestId('form-image-label');
        const image = screen.getByTestId('form-image-image');

        expect(label).toBeOnTheScreen();
        expect(label).toHaveTextContent('Imagen:');
        expect(image).toBeOnTheScreen();
        expect(image).toHaveProp('source', { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTar_ouGael5ODlrC1kbFbKLpEPSJtTQqdaIg&s' });
    });

    it('should call takeImageToGallery when gallery button is pressed', async () => {
        renderComponent();

        const pressables = screen.getAllByTestId('button-pressable');
        await user.press(pressables[0]);

        expect(takeImageToGalleryMock).toHaveBeenCalledTimes(1);
    });

    it('should call takePhoto when camera button is pressed', async () => {
        renderComponent();

        const pressables = screen.getAllByTestId('button-pressable');
        await user.press(pressables[1]);

        expect(takePhotoMock).toHaveBeenCalledTimes(1);
    });
});