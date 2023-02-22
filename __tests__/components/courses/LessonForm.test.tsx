import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { LessonForm } from '../../../src/components/courses';

import { courseSelectedState, lessonSelectedState } from '../../features/courses';

import { useCourses, useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const saveLessonMock = jest.fn();
const updateLessonMock = jest.fn();
const setErrorFormMock = jest.fn();

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
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

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
                const input = screen.getByTestId('form-field-text-input');
                fireEvent(input, 'onChangeText', textValue);

                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                expect(saveLessonMock).toHaveBeenCalledTimes(1);
            });

            const btnText = screen.getAllByTestId('button-text')[1];

            expect(btnText.props.children).toBe('Guardar');
            expect(saveLessonMock).toHaveBeenCalledWith({
                description: textValue,
                next_lesson: expect.any(Date)
            });
        });
    });

    it('should call updateLesson when form is valid and selectedLesson isnt empty', async () => {
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
                const input = screen.getByTestId('form-field-text-input');
                fireEvent(input, 'onChangeText', textValue);

                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                expect(updateLessonMock).toHaveBeenCalledTimes(1);
            });

            const btnText = screen.getAllByTestId('button-text')[1];

            expect(btnText.props.children).toBe('Actualizar');
            expect(updateLessonMock).toHaveBeenCalledWith({
                description: textValue,
                next_lesson: expect.any(Date)
            });
        });
    });
});