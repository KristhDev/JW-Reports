import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { LessonForm } from '../../../src/components/courses';

/* Features */
import { courseSelectedState, lessonSelectedState } from '../../features/courses';

/* Hooks */
import { useCourses, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const saveLessonMock = jest.fn();
const updateLessonMock = jest.fn();
const setErrorFormMock = jest.fn();

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <LessonForm /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: {
            ...courseSelectedState,
            selectedLesson: {
                ...courseSelectedState.selectedLesson,
                next_lesson: '2022-12-29 00:00:00'
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

        await act(async () => {
            await waitFor(() => {

                /* Get submit touchable */
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                /* Check if setErrorForm is called one time */
                expect(setErrorFormMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call saveLesson when form is valid and selectedLesson is empty', async () => {
        await waitFor(() => {
            render(<LessonForm />);
        });

        const textValue = 'Expedita ab laboriosam excepturi earum nam cupiditate ut rerum veritatis.';

        await act(async () => {
            await waitFor(() => {

                /* Get text input to type description of lesson */
                const input = screen.getByTestId('form-field-text-input');
                fireEvent(input, 'onChangeText', textValue);

                /* Get submit touchable */
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                /* Check if saveLesson is called one time */
                expect(saveLessonMock).toHaveBeenCalledTimes(1);
            });

            /* Get text of submit touchable */
            const btnText = screen.getAllByTestId('button-text')[1];

            /**
             * Check if text of submit touchable is equal to Guardar and saveLesson
             * is called with respective args
             */
            expect(btnText.props.children).toBe('Guardar');
            expect(saveLessonMock).toHaveBeenCalledWith({
                description: textValue,
                next_lesson: expect.any(Date)
            });
        });
    });

    it('should call updateLesson when form is valid and selectedLesson isnt empty', async () => {

        /* Mock data of useCourses */
        (useCourses as jest.Mock).mockReturnValue({
            state: lessonSelectedState,
            saveLesson: saveLessonMock,
            updateLesson: updateLessonMock
        });

        await waitFor(() => {
            render(<LessonForm />);
        });

        const textValue = 'Expedita ab laboriosam excepturi earum nam cupiditate ut rerum veritatis.';

        await act(async () => {
            await waitFor(() => {

                /* Get text input to type description of lesson */
                const input = screen.getByTestId('form-field-text-input');
                fireEvent(input, 'onChangeText', textValue);

                /* Get submit touchable */
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                /* Check if updateLesson is called one time */
                expect(updateLessonMock).toHaveBeenCalledTimes(1);
            });

            /* Get text of submit touchable */
            const btnText = screen.getAllByTestId('button-text')[1];

            /**
             * Check if text of submit touchable is equal to Actualizar and updateLesson
             * is called with respective args
             */
            expect(btnText.props.children).toBe('Actualizar');
            expect(updateLessonMock).toHaveBeenCalledWith({
                description: textValue,
                next_lesson: expect.any(Date)
            });
        });
    });
});