import React from 'react';
import { act, render, screen, waitFor, userEvent } from '@testing-library/react-native';

/* Mocks */
import {
    initialLessonsStateMock,
    lessonSelectedStateMock,
    saveLessonMock,
    setErrorFormMock,
    updateLessonMock
} from '../../../../mocks';

/* Modules */
import { LessonForm, useLessons } from '../../../../../src/modules/lessons';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/lessons/hooks/useLessons.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderComponent = () => render(<LessonForm />);

describe('Test in <LessonForm /> component', () => {
    (useLessons as jest.Mock).mockReturnValue({
        state: {
            ...initialLessonsStateMock,
            selectedLesson: {
                ...initialLessonsStateMock.selectedLesson,
                nextLesson: '2022-12-29 00:00:00'
            }
        },
        saveLesson: saveLessonMock,
        updateLesson: updateLessonMock
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

        const pressable = (await screen.findAllByTestId('button-touchable'))[1];
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveLesson when form is valid and selectedLesson is empty', async () => {
        await waitFor(() => {
            renderComponent();
        });

        const textValue = 'Expedita ab laboriosam excepturi earum nam cupiditate ut rerum veritatis.';

        const input = await screen.findByTestId('form-field-text-input');
        await user.type(input, textValue);

        /* Get submit touchable */
        const pressable = (await screen.findAllByTestId('button-touchable'))[1];
        await user.press(pressable);

        /* Get text of submit pressable and check if it is equal to Guardar */
        const btnText = (await screen.findAllByTestId('button-text'))[1];
        expect(btnText).toHaveTextContent('Guardar');

        /* Check if saveLesson is called with respective args */
        expect(saveLessonMock).toHaveBeenCalledTimes(1);
        expect(saveLessonMock).toHaveBeenCalledWith({
            description: textValue,
            nextLesson: expect.any(Date)
        });
    });

    it('should call updateLesson when form is valid and selectedLesson isnt empty', async () => {

        /* Mock data of useLessons */
        (useLessons as jest.Mock).mockReturnValue({
            state: lessonSelectedStateMock,
            saveLesson: saveLessonMock,
            updateLesson: updateLessonMock
        });

        await waitFor(() => {
            renderComponent();
        });

        const textValue = 'Expedita ab laboriosam excepturi earum nam cupiditate ut rerum veritatis.';

        const input = await screen.findByTestId('form-field-text-input');
        await user.type(input, textValue);

        const pressable = (await screen.findAllByTestId('button-touchable'))[1];
        await user.press(pressable);

        /* Get text of submit pressable and check if it is equal to Actualizar */
        const btnText = (await screen.findAllByTestId('button-text'))[1];
        expect(btnText).toHaveTextContent('Actualizar');

        /* Check if updateLesson is called one time and with respective args */
        expect(updateLessonMock).toHaveBeenCalledTimes(1);
        expect(updateLessonMock).toHaveBeenCalledWith({
            description: textValue,
            nextLesson: expect.any(Date)
        });
    });
});