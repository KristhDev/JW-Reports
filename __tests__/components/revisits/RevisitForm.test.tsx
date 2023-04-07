import React from 'react';
import { Image } from 'react-native-image-crop-picker';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Features */
import { revisitsState, selectedRevisitState  } from '../../features/revisits';

/* Components */
import { RevisitForm } from '../../../src/components/revisits';

/* Hooks */
import { useImage, useRevisits, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const setErrorFormMock = jest.fn();
const saveRevisitMock = jest.fn();
const updateRevisitMock = jest.fn();
const takeImageToGalleryMock = jest.fn();
const takePhotoMock = jest.fn();

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
            ...revisitsState,
            selectedRevisit: {
                ...revisitsState.selectedRevisit,
                next_visit: '2022-12-29 00:00:00'
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

        await act(async () => {
            await waitFor(() => {

                /* Get submit touchable */
                const touchable = screen.getAllByTestId('button-touchable')[3];
                fireEvent.press(touchable);

                /* Check if setErrorForm is called one time */
                expect(setErrorFormMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call saveRevisit when form is valid and selectedRevisit is empty', async () => {
        await waitFor(() => {
            render(<RevisitForm />);
        });

        await act(async () => {
            await waitFor(() => {

                /* Get text inputs to type person name, about and direction */
                const inputs = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputs[0], 'onChangeText', personName);
                fireEvent(inputs[1], 'onChangeText', about);
                fireEvent(inputs[2], 'onChangeText', direction);

                /* Get submit touchable */
                const touchable = screen.getAllByTestId('button-touchable')[3];
                fireEvent.press(touchable);

                /* Check if setErrorForm is called one time */
                expect(saveRevisitMock).toHaveBeenCalledTimes(1);
            });

            /* Get text of submit touchable */
            const btnText = screen.getAllByTestId('button-text')[3];

            /**
             * Check if text of submit touchable is equal to Guardar and saveRevisit
             * is called with respective args
             */
            expect(btnText.props.children).toBe('Guardar');
            expect(saveRevisitMock).toHaveBeenCalledWith({
                revisitValues: {
                    person_name: personName,
                    about,
                    address: direction,
                    next_visit: expect.any(Date)
                },
                image
            });
        });
    });

    it('should call updateRevisit when form is valid and selectedRevisit isnt empty', async () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: selectedRevisitState,
            saveRevisit: saveRevisitMock,
            updateRevisit: updateRevisitMock
        });

        await waitFor(() => {
            render(<RevisitForm />);
        });

        await act(async () => {
            await waitFor(() => {

                /* Get text input to type new content of about */
                const inputs = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputs[1], 'onChangeText', about);

                /* Get submit touchable */
                const touchable = screen.getAllByTestId('button-touchable')[3];
                fireEvent.press(touchable);

                /* Check if updateRevisit is called one time */
                expect(updateRevisitMock).toHaveBeenCalledTimes(1);
            });

            /* Get text of submit touchable */
            const btnText = screen.getAllByTestId('button-text')[3];

            /**
             * Check if text of submit touchable is equal to Actualizar and
             * updateRevisit is called with respective args
             */
            expect(btnText.props.children).toBe('Actualizar');
            expect(updateRevisitMock).toHaveBeenCalledWith(
                {
                    person_name: selectedRevisitState.selectedRevisit.person_name,
                    about,
                    address: selectedRevisitState.selectedRevisit.address,
                    next_visit: expect.any(Date)
                },
                image
            );
        });
    });

    it('should call takeImageToGallery when gallery button is pressed', async () => {
        await waitFor(() => {
            render(<RevisitForm />);
        });

        await act(async () => {
            await waitFor(() => {

                /* Get gallery touchable */
                const touchable = screen.getAllByTestId('button-touchable')[0];
                fireEvent.press(touchable);

                /* Check if takeImageToGallery is called one time */
                expect(takeImageToGalleryMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call takePhoto when photo button is pressed', async () => {
        await waitFor(() => {
            render(<RevisitForm />);
        });

        await act(async () => {
            await waitFor(() => {

                /* Get camera touchable */
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                /* Check if takePhoto is called one time */
                expect(takePhotoMock).toHaveBeenCalledTimes(1);
            });
        });
    });
});