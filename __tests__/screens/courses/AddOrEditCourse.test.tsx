import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react-native';

import { AddOrEditCourse } from '../../../src/screens/courses';

import { courseSelectedState, coursesState } from '../../features/courses';

import { useCourses, useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <AddOrEditCourse /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesState,
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
            render(<AddOrEditCourse />);
        });

        await act(async () => {
            await waitFor(() => {
                expect(screen.toJSON()).toMatchSnapshot();
            });
        });
    });

    it('should render respective title when seletedCourse is empty', async () => {
        await waitFor(() => {
            render(<AddOrEditCourse />);
        });

        await act(async () => {
            await waitFor(() => {
                const title = screen.getByTestId('title-text');

                expect(title).toBeTruthy();
                expect(title.props.children).toBe('Agregar curso bíblico');
            });
        })
    });

    it('should render respective title when seletedCourse isnt empty', async () => {
        (useCourses as jest.Mock).mockReturnValue({
            state: courseSelectedState,
            saveCourse: jest.fn(),
            updateCourse: jest.fn()
        });

        await waitFor(() => {
            render(<AddOrEditCourse />);
        });

        await act(async () => {
            await waitFor(() => {
                const title = screen.getByTestId('title-text');

                expect(title).toBeTruthy();
                expect(title.props.children).toBe('Editar curso bíblico');
            });
        });
    });
});