import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { useLessonsSpy, useStatusSpy, useUISpy } from '@test-setup';

/* Mocks */
import {
    initialLessonsStateMock,
    lessonSelectedStateMock,
    saveLessonMock,
    setErrorFormMock,
    updateLessonMock
} from '@mocks';

/* Modules */
import { LessonForm } from '@lessons';
import { UI_INITIAL_STATE } from '@ui';

const user = userEvent.setup();
const renderComponent = () => render(<LessonForm />);

describe('Test in <LessonForm /> component', () => {
    useLessonsSpy.mockImplementation(() => ({
        state: {
            ...initialLessonsStateMock,
            selectedLesson: {
                ...initialLessonsStateMock.selectedLesson,
                nextLesson: '2022-12-29 00:00:00'
            }
        },
        saveLesson: saveLessonMock,
        updateLesson: updateLessonMock
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

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when form is invalid', async () => {
        renderComponent();

        const pressable = (await screen.findAllByTestId('button-pressable'))[1];
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveLesson when form is valid and selectedLesson is empty', async () => {
        renderComponent();

        const textValue = 'Expedita ab laboriosam excepturi earum nam cupiditate ut rerum veritatis.';

        const input = await screen.findByTestId('form-field-text-input');
        await user.type(input, textValue);

        /* Get submit pressable */
        const pressable = (await screen.findAllByTestId('button-pressable'))[1];
        await user.press(pressable);

        /* Check if text content it is equal to Guardar */
        expect(pressable).toHaveTextContent('Guardar');

        /* Check if saveLesson is called with respective args */
        expect(saveLessonMock).toHaveBeenCalledTimes(1);
        expect(saveLessonMock).toHaveBeenCalledWith({
            description: textValue,
            nextLesson: expect.any(Date)
        });
    });

    it('should call updateLesson when form is valid and selectedLesson isnt empty', async () => {

        /* Mock data of useLessons */
        useLessonsSpy.mockImplementation(() => ({
            state: lessonSelectedStateMock,
            saveLesson: saveLessonMock,
            updateLesson: updateLessonMock
        }) as any);

        renderComponent();

        const textValue = 'Expedita ab laboriosam excepturi earum nam cupiditate ut rerum veritatis.';

        const input = await screen.findByTestId('form-field-text-input');
        await user.clear(input);
        await user.type(input, textValue);

        const pressable = (await screen.findAllByTestId('button-pressable'))[1];
        await user.press(pressable);

        /* Check if pressable text it is equal to Actualizar */
        expect(pressable).toHaveTextContent('Actualizar');

        /* Check if updateLesson is called one time and with respective args */
        expect(updateLessonMock).toHaveBeenCalledTimes(1);
        expect(updateLessonMock).toHaveBeenCalledWith({
            description: textValue,
            nextLesson: expect.any(Date)
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
        expect(dateTimeInputs).toHaveLength(1);

        dateTimeInputs.forEach((input) => {
            expect(input).toBeOnTheScreen();
        });
    });
});