import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { LessonForm } from '../../../src/components/courses';

/* Hooks */
import { useCourses, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { courseSelectedStateMock, lessonSelectedStateMock, saveLessonMock, setErrorFormMock, updateLessonMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <LessonForm /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: {
            ...courseSelectedStateMock,
            selectedLesson: {
                ...courseSelectedStateMock.selectedLesson,
                nextLesson: '2022-12-29 00:00:00'
            }
        },
        saveLesson: saveLessonMock,
        updateLesson: updateLessonMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<LessonForm />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when form is invalid', async () => {
        await waitFor(() => {
            render(<LessonForm />);
        });

        const touchable = (await screen.findAllByTestId('button-touchable'))[1];

        await waitFor(() => {
            /* Submit touchable */
            fireEvent.press(touchable);
        });

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveLesson when form is valid and selectedLesson is empty', async () => {
        await waitFor(() => {
            render(<LessonForm />);
        });

        const textValue = 'Expedita ab laboriosam excepturi earum nam cupiditate ut rerum veritatis.';

        const input = await screen.findByTestId('form-field-text-input');

        await waitFor(() => {
            /* Get text input to type description of lesson */
            fireEvent(input, 'onChangeText', textValue);
        });

        /* Get submit touchable */
        const touchable = (await screen.findAllByTestId('button-touchable'))[1];

        await waitFor(() => {
            fireEvent.press(touchable);
        });

        /* Get text of submit touchable */
        const btnText = (await screen.findAllByTestId('button-text'))[1];

        /**
         * Check if text of submit touchable is equal to Guardar and saveLesson
         * is called with respective args
         */
        expect(btnText.props.children).toBe('Guardar');

        /* Check if saveLesson is called one time */
        expect(saveLessonMock).toHaveBeenCalledTimes(1);
        expect(saveLessonMock).toHaveBeenCalledWith({
            description: textValue,
            nextLesson: expect.any(Date)
        });
    });

    it('should call updateLesson when form is valid and selectedLesson isnt empty', async () => {

        /* Mock data of useCourses */
        (useCourses as jest.Mock).mockReturnValue({
            state: lessonSelectedStateMock,
            saveLesson: saveLessonMock,
            updateLesson: updateLessonMock
        });

        await waitFor(() => {
            render(<LessonForm />);
        });

        const textValue = 'Expedita ab laboriosam excepturi earum nam cupiditate ut rerum veritatis.';
        const input = await screen.findByTestId('form-field-text-input');

        await waitFor(() => {
            /* Get text input to type description of lesson */
            fireEvent(input, 'onChangeText', textValue);
        });

        const touchable = (await screen.findAllByTestId('button-touchable'))[1];

        await waitFor(() => {
            /* Get submit touchable */
            fireEvent.press(touchable);
        });

        /* Get text of submit touchable */
        const btnText = (await screen.findAllByTestId('button-text'))[1];

        /**
         * Check if text of submit touchable is equal to Actualizar and updateLesson
         * is called with respective args
         */
        expect(btnText.props.children).toBe('Actualizar');

        /* Check if updateLesson is called one time */
        expect(updateLessonMock).toHaveBeenCalledTimes(1);
        expect(updateLessonMock).toHaveBeenCalledWith({
            description: textValue,
            nextLesson: expect.any(Date)
        });
    });
});