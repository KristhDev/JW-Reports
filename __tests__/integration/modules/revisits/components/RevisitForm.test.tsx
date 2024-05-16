import React from 'react';
import { act, render, screen, waitFor, userEvent } from '@testing-library/react-native';

/* Mocks */
import {
    imageMock,
    revisitsStateMock,
    saveRevisitMock,
    selectedRevisitStateMock,
    setErrorFormMock,
    takeImageToGalleryMock,
    takePhotoMock,
    updateRevisitMock
} from '../../../../mocks';

/* Modules */
import { useImage, useStatus } from '../../../../../src/modules/shared';
import { RevisitForm, useRevisits } from '../../../../../src/modules/revisits';

const personName = 'Clifton DAmore';
const about = 'Possimus magnam cum quo saepe et accusamus consectetur molestiae. Eos et et nobis dolor. Enim repellat quia officia fuga qui. Cumque delectus unde possimus consequatur ducimus.';
const direction = 'Et fuga eaque voluptatum est. Et ad quos sit id ducimus a hic. Perferendis deserunt eius aut harum nisi doloremque consequuntur maiores. Aut voluptas corrupti facere sed ut. Enim qui quaerat quos quia quia expedita et.';

/* Mock hooks */
jest.mock('../../../../../src/modules/shared/hooks/useImage.ts');
jest.mock('../../../../../src/modules/revisits/hooks/useRevisits.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderComponent = () => render(<RevisitForm />);

describe('Test in <RevisitForm /> component', () => {
    (useImage as jest.Mock).mockReturnValue({
        image: imageMock,
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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderComponent();
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when form is invalid', async () => {
        await waitFor(() => {
            renderComponent();
        });

        /* Get submit touchable */
        const pressable = (await screen.findAllByTestId('button-touchable'))[3];
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveRevisit when form is valid and selectedRevisit is empty', async () => {
        await waitFor(() => {
            renderComponent();
        });

        const inputs = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputs[0], personName);
        await user.type(inputs[1], about);
        await user.type(inputs[2], direction);

        /* Get submit touchable */
        const pressable = (await screen.findAllByTestId('button-touchable'))[3];
        await user.press(pressable);

        /* Get text of submit touchable */
        const btnText = (await screen.findAllByTestId('button-text'))[3];

        /**
         * Check if text of submit touchable is equal to Guardar and saveRevisit
         * is called with respective args
         */
        expect(btnText).toHaveTextContent('Guardar');
        expect(saveRevisitMock).toHaveBeenCalledTimes(1);
        expect(saveRevisitMock).toHaveBeenCalledWith({
            revisitValues: {
                personName,
                about,
                address: direction,
                nextVisit: expect.any(Date)
            },
            imageMock
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
            renderComponent();
        });

        const inputs = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputs[1], about);

        /* Get submit touchable */
        const pressable = (await screen.findAllByTestId('button-touchable'))[3];
        await user.press(pressable);

        /* Get text of submit touchable */
        const btnText = (await screen.findAllByTestId('button-text'))[3];

        /**
         * Check if text of submit touchable is equal to Actualizar and
         * updateRevisit is called with respective args
        */
        expect(btnText).toHaveTextContent('Actualizar');
        expect(updateRevisitMock).toHaveBeenCalledTimes(1);
        expect(updateRevisitMock).toHaveBeenCalledWith(
            {
                personName: selectedRevisitStateMock.selectedRevisit.personName,
                about,
                address: selectedRevisitStateMock.selectedRevisit.address,
                nextVisit: expect.any(Date)
            },
            imageMock
        );
    });

    it('should call takeImageToGallery when gallery button is pressed', async () => {
        await waitFor(() => {
            renderComponent();
        });

        /* Get gallery touchable */
        const pressable = (await screen.findAllByTestId('button-touchable'))[0];
        await user.press(pressable);

        /* Check if takeImageToGallery is called one time */
        expect(takeImageToGalleryMock).toHaveBeenCalledTimes(1);
    });

    it('should call takePhoto when photo button is pressed', async () => {
        await waitFor(() => {
            renderComponent();
        });

        /* Get camera touchable */
        const pressable = (await screen.findAllByTestId('button-touchable'))[1];
        await user.press(pressable);

        /* Check if takePhoto is called one time */
        expect(takePhotoMock).toHaveBeenCalledTimes(1);
    });
});