import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';

/* Mocks */
import {
    imageModelMock,
    initialUIStateMock,
    revisitsStateMock,
    saveRevisitMock,
    selectedRevisitStateMock,
    setErrorFormMock,
    takeImageToGalleryMock,
    takePhotoMock,
    updateRevisitMock,
    useImageSpy,
    useRevisitsSpy,
    useStatusSpy,
    useUISpy
} from '@mocks';

/* Features */
import { UI_INITIAL_STATE } from '@application/features';

/* Modules */
import { RevisitForm } from '@revisits';

const personName = 'Clifton DAmore';
const about = 'Possimus magnam cum quo saepe et accusamus consectetur molestiae. Eos et et nobis dolor. Enim repellat quia officia fuga qui. Cumque delectus unde possimus consequatur ducimus.';
const direction = 'Et fuga eaque voluptatum est. Et ad quos sit id ducimus a hic. Perferendis deserunt eius aut harum nisi doloremque consequuntur maiores. Aut voluptas corrupti facere sed ut. Enim qui quaerat quos quia quia expedita et.';

const user = userEvent.setup();
const renderComponent = () => render(<RevisitForm />);

describe('Test in <RevisitForm /> component', () => {
    useImageSpy.mockImplementation(() => ({
        image: imageModelMock,
        takeImageToGallery: takeImageToGalleryMock,
        takePhoto: takePhotoMock
    }) as any);

    useRevisitsSpy.mockImplementation(() => ({
        state: {
            ...revisitsStateMock,
            selectedRevisit: {
                ...revisitsStateMock.selectedRevisit,
                nextVisit: '2022-12-29 00:00:00'
            }
        },
        saveRevisit: saveRevisitMock,
        updateRevisit: updateRevisitMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: initialUIStateMock,
        setActiveFormField: jest.fn()
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        renderComponent();

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm if form is invalid', async () => {
        renderComponent();

        /* Get submit pressable */
        const pressable = (await screen.findAllByTestId('button-pressable'))[3];
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveRevisit if form is valid and selectedRevisit is empty', async () => {
        renderComponent();

        const inputs = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputs[0], personName);
        await user.type(inputs[1], about);
        await user.type(inputs[2], direction);

        /* Get submit pressable */
        const pressable = (await screen.findAllByTestId('button-pressable'))[3];
        await user.press(pressable);

        /* Check if text of submit pressable is equal to Guardar */
        expect(pressable).toHaveTextContent('Guardar');

        /* Check if saveRevisit is called with respective args */
        expect(saveRevisitMock).toHaveBeenCalledTimes(1);
        expect(saveRevisitMock).toHaveBeenCalledWith({
            revisitValues: {
                personName,
                about,
                address: direction,
                nextVisit: expect.any(Date)
            },
            image: imageModelMock
        });
    });

    it('should call updateRevisit if form is valid and selectedRevisit isnt empty', async () => {

        /* Mock data of useRevisits */
        useRevisitsSpy.mockImplementation(() => ({
            state: selectedRevisitStateMock,
            saveRevisit: saveRevisitMock,
            updateRevisit: updateRevisitMock
        }) as any);

        renderComponent();

        const inputs = await screen.findAllByTestId('form-field-text-input');
        await user.clear(inputs[1]);
        await user.type(inputs[1], about);

        /* Get submit pressable */
        const pressable = (await screen.findAllByTestId('button-pressable'))[3];
        await user.press(pressable);

        /* Check if text of submit pressable is equal to Actualizar */
        expect(pressable).toHaveTextContent('Actualizar');

        /* Check if updateRevisit is called with respective args */
        expect(updateRevisitMock).toHaveBeenCalledTimes(1);
        expect(updateRevisitMock).toHaveBeenCalledWith({
            revisitValues: {
                personName: selectedRevisitStateMock.selectedRevisit.personName,
                about,
                address: selectedRevisitStateMock.selectedRevisit.address,
                nextVisit: expect.any(Date)
            },
            image: imageModelMock
        });
    });

    it('should call takeImageToGallery if gallery button is pressed', async () => {
        renderComponent();

        /* Get gallery pressable */
        const pressable = (await screen.findAllByTestId('button-pressable'))[0];
        await user.press(pressable);

        /* Check if takeImageToGallery is called one time */
        expect(takeImageToGalleryMock).toHaveBeenCalledTimes(1);
    });

    it('should call takePhoto if photo button is pressed', async () => {
        renderComponent();

        /* Get camera pressable */
        const pressable = (await screen.findAllByTestId('button-pressable'))[1];
        await user.press(pressable);

        /* Check if takePhoto is called one time */
        expect(takePhotoMock).toHaveBeenCalledTimes(1);
    });

    it('should render old date fields if userInterface.oldDatetimePicker is true', async () => {

        /* Mock data of useUI */
        useUISpy.mockImplementation(() => ({
            state: {
                ...UI_INITIAL_STATE,
                userInterface: {
                    ...UI_INITIAL_STATE.userInterface,
                    oldDatetimePicker: true
                }
            }
        }) as any);

        renderComponent();

        const dateTimeInputs = await screen.findAllByTestId('datetimefield-text-input');
        expect(dateTimeInputs).toHaveLength(1);

        dateTimeInputs.forEach((input) => {
            expect(input).toBeOnTheScreen();
        });
    });
});