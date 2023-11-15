import React from 'react';
import { Image } from 'react-native-image-crop-picker';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { RevisitForm } from '../../../src/components/revisits';

/* Hooks */
import { useImage, useRevisits, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { saveRevisitMock, setErrorFormMock, takeImageToGalleryMock, takePhotoMock, updateRevisitMock } from '../../mocks';
import { revisitsStateMock, selectedRevisitStateMock } from '../../mocks/revisits';

const image: Image = {
    height: 200,
    mime: 'image/jpeg',
    path: 'https://local-image.com/images.jpg',
    size: 120,
    width: 200
}

const personName = 'Clifton DAmore';
const about = 'Possimus magnam cum quo saepe et accusamus consectetur molestiae. Eos et et nobis dolor. Enim repellat quia officia fuga qui. Cumque delectus unde possimus consequatur ducimus.';
const direction = 'Et fuga eaque voluptatum est. Et ad quos sit id ducimus a hic. Perferendis deserunt eius aut harum nisi doloremque consequuntur maiores. Aut voluptas corrupti facere sed ut. Enim qui quaerat quos quia quia expedita et.';

/* Mock hooks */
jest.mock('../../../src/hooks/useImage.ts');
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <RevisitForm /> component', () => {
    (useImage as jest.Mock).mockReturnValue({
        image,
        takeImageToGallery: takeImageToGalleryMock,
        takePhoto: takePhotoMock
    });

    (useRevisits as jest.Mock).mockReturnValue({
        state: {
            ...revisitsStateMock,
            selectedRevisit: {
                ...revisitsStateMock.selectedRevisit,
                nextVisit: '2022-12-29 00:00:00'
            }
        },
        saveRevisit: saveRevisitMock,
        updateRevisit: updateRevisitMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<RevisitForm />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when form is invalid', async () => {
        await waitFor(() => {
            render(<RevisitForm />);
        });

        /* Get submit touchable */
        const touchable = (await screen.findAllByTestId('button-touchable'))[3];

        await waitFor(() => {
            fireEvent.press(touchable);
        });

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveRevisit when form is valid and selectedRevisit is empty', async () => {
        await waitFor(() => {
            render(<RevisitForm />);
        });

        const inputs = await screen.findAllByTestId('form-field-text-input');

        await waitFor(() => {

            /* Get text inputs to type person name, about and direction */
            fireEvent(inputs[0], 'onChangeText', personName);
            fireEvent(inputs[1], 'onChangeText', about);
            fireEvent(inputs[2], 'onChangeText', direction);
        });

        /* Get submit touchable */
        const touchable = (await screen.findAllByTestId('button-touchable'))[3];

        await waitFor(() => {
            fireEvent.press(touchable);
        });

        /* Get text of submit touchable */
        const btnText = (await screen.getAllByTestId('button-text'))[3];

        /**
         * Check if text of submit touchable is equal to Guardar and saveRevisit
         * is called with respective args
         */
        expect(btnText.props.children).toBe('Guardar');
        expect(saveRevisitMock).toHaveBeenCalledTimes(1);
        expect(saveRevisitMock).toHaveBeenCalledWith({
            revisitValues: {
                personName,
                about,
                address: direction,
                nextVisit: expect.any(Date)
            },
            image
        });
    });

    it('should call updateRevisit when form is valid and selectedRevisit isnt empty', async () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: selectedRevisitStateMock,
            saveRevisit: saveRevisitMock,
            updateRevisit: updateRevisitMock
        });

        await waitFor(() => {
            render(<RevisitForm />);
        });

        const inputs = await screen.findAllByTestId('form-field-text-input');

        await waitFor(() => {
            /* Get text input to type new content of about */
            fireEvent(inputs[1], 'onChangeText', about);
        });

        /* Get submit touchable */
        const touchable = (await screen.findAllByTestId('button-touchable'))[3];

        await waitFor(() => {
            fireEvent.press(touchable);
        });

        /* Get text of submit touchable */
        const btnText = (await screen.findAllByTestId('button-text'))[3];

        /**
         * Check if text of submit touchable is equal to Actualizar and
         * updateRevisit is called with respective args
        */
        expect(btnText.props.children).toBe('Actualizar');
        expect(updateRevisitMock).toHaveBeenCalledTimes(1);
        expect(updateRevisitMock).toHaveBeenCalledWith(
            {
                personName: selectedRevisitStateMock.selectedRevisit.personName,
                about,
                address: selectedRevisitStateMock.selectedRevisit.address,
                nextVisit: expect.any(Date)
            },
            image
        );
    });

    it('should call takeImageToGallery when gallery button is pressed', async () => {
        await waitFor(() => {
            render(<RevisitForm />);
        });

        /* Get gallery touchable */
        const touchable = (await screen.findAllByTestId('button-touchable'))[0];

        await waitFor(() => {
            fireEvent.press(touchable);
        });

        /* Check if takeImageToGallery is called one time */
        expect(takeImageToGalleryMock).toHaveBeenCalledTimes(1);
    });

    it('should call takePhoto when photo button is pressed', async () => {
        await waitFor(() => {
            render(<RevisitForm />);
        });

        /* Get camera touchable */
        const touchable = (await screen.findAllByTestId('button-touchable'))[1];

        await waitFor(() => {
            fireEvent.press(touchable);
        });

        /* Check if takePhoto is called one time */
        expect(takePhotoMock).toHaveBeenCalledTimes(1);
    });
});