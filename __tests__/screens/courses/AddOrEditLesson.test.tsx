import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react-native';

import { AddOrEditLesson } from '../../../src/screens/courses';

import { courseSelectedState, lessonSelectedState } from '../../features/courses';

import { useCourses, useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <AddOrEditLesson /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: {
            ...courseSelectedState,
            selectedLesson: {
                ...courseSelectedState.selectedLesson,
                next_lesson: '2022-12-29 00:00:00'
            }
        },
        saveCourse: jest.fn(),
        updateCourse: jest.fn()
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: jest.fn()
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<AddOrEditLesson />);
        });

        await act(async () => {
            await waitFor(() => {
                expect(screen.toJSON()).toMatchSnapshot();
            });
        });
    });

    it('should render respective title when seletedLesson is empty', async () => {
        await waitFor(() => {
            render(<AddOrEditLesson />);
        });

        await act(async () => {
            await waitFor(() => {
                const title = screen.getByTestId('title-text');

                expect(title).toBeTruthy();
                expect(title.props.children).toBe('Agregar clase para el curso');
            });
        })
    });

    it('should render respective title when seletedLesson isnt empty', async () => {
        (useCourses as jest.Mock).mockReturnValue({
            state: lessonSelectedState,
            saveCourse: jest.fn(),
            updateCourse: jest.fn()
        });

        await waitFor(() => {
            render(<AddOrEditLesson />);
        });

        await act(async () => {
            await waitFor(() => {
                const title = screen.getByTestId('title-text');

                expect(title).toBeTruthy();
                expect(title.props.children).toBe('Editar clase del curso');
            });
        });
    });
});