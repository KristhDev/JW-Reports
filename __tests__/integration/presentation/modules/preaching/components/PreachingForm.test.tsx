import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { usePreachingSpy, useStatusSpy, useUISpy } from '@test-setup';

/* Mocks */
import {
    initialPreachingStateMock,
    preachingSelectedStateMock,
    preachingsStateMock,
    savePreachingMock,
    setErrorFormMock,
    updatePreachingMock
} from '@mocks';

/* Features */
import { INIT_PREACHING, UI_INITIAL_STATE } from '@application/features';

/* Modules */
import { PreachingForm } from '@preaching';

const preachingDay = '2022-12-29 00:00:00';
const initHour = '2022-12-30 09:00:00';
const finalHour = '2022-12-30 11:30:00';

const user = userEvent.setup();
const renderComponent = () => render(<PreachingForm />);

describe('Test in <PreachingForm /> component', () => {
    usePreachingSpy.mockImplementation(() => ({
        state: {
            ...preachingsStateMock,
            seletedPreaching: {
                ...INIT_PREACHING,
                day: preachingDay,
                initHour: initHour,
                finalHour: finalHour
            }
        },
        savePreaching: savePreachingMock,
        updatePreaching: updatePreachingMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: UI_INITIAL_STATE
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        renderComponent();

        await act(async () => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when form is invalid', async () => {
        /* Mock data of usePreaching */
        usePreachingSpy.mockImplementation(() => ({
            state: {
                ...preachingsStateMock,
                seletedPreaching: {
                    ...INIT_PREACHING,
                    day: preachingDay,
                    initHour: finalHour,
                    finalHour: initHour
                }
            },
            savePreaching: savePreachingMock,
            updatePreaching: updatePreachingMock
        }) as any);

        renderComponent();

        const pressable = (await screen.findAllByTestId('button-pressable'))[3];
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call savePreaching when form is valid and selectedPreaching is empty', async () => {

        /* Mock data of usePreaching */
        usePreachingSpy.mockImplementation(() => ({
            state: {
                ...initialPreachingStateMock,
                seletedPreaching: {
                    ...INIT_PREACHING,
                    day: preachingDay,
                    initHour: initHour,
                    finalHour: finalHour
                }
            },
            savePreaching: savePreachingMock,
            updatePreaching: updatePreachingMock
        }) as any);

        renderComponent();

        const pressable = (await screen.findAllByTestId('button-pressable'))[3];
        await user.press(pressable);

        /* Get text of submit pressable and if text is equal to Guardar */
        expect(pressable).toHaveTextContent('Guardar');

        /* Check if savePreaching is called with respective args */
        expect(savePreachingMock).toHaveBeenCalledTimes(1);
        expect(savePreachingMock).toHaveBeenCalledWith({
            day: new Date(preachingDay),
            initHour: new Date(initHour),
            finalHour: new Date(finalHour),
        });
    });

    it('should call updatePreaching when form is valid and selectedPreaching isnt empty', async () => {

        /* Mock data of usePreaching */
        usePreachingSpy.mockImplementation(() => ({
            state: preachingSelectedStateMock,
            savePreaching: savePreachingMock,
            updatePreaching: updatePreachingMock
        }) as any);

        renderComponent();

        const pressable = (await screen.findAllByTestId('button-pressable'))[3];
        await user.press(pressable);

        expect(pressable).toHaveTextContent('Actualizar');

        /* Check if updatePreaching is called with respective args */
        expect(updatePreachingMock).toHaveBeenCalledTimes(1);
        expect(updatePreachingMock).toHaveBeenCalledWith({
            day: new Date(preachingSelectedStateMock.seletedPreaching.day),
            initHour: new Date(preachingSelectedStateMock.seletedPreaching.initHour),
            finalHour: new Date(preachingSelectedStateMock.seletedPreaching.finalHour),
        });
    });

    it('should render old date fields when userInterface.oldDatetimePicker is true', async () => {

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
        expect(dateTimeInputs).toHaveLength(3);

        dateTimeInputs.forEach((input) => {
            expect(input).toBeOnTheScreen();
        });
    });
});