import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Setup */
import { useCoursesSpy, useStatusSpy } from '../../../../../jest.setup';

/* Mocks */
import { courseSelectedStateMock, coursesStateMock } from '../../../../mocks';

/* Modules */
import { AddOrEditCourse } from '../../../../../src/modules/courses';

const renderScreen = () => render(<AddOrEditCourse />);

describe('Test in <AddOrEditCourse /> screen', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: coursesStateMock,
        saveCourse: jest.fn(),
        updateCourse: jest.fn()
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: jest.fn()
    }) as any);

    it('should to match snapshot', async () => {
        renderScreen();

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title when seletedCourse is empty', async () => {
        renderScreen();

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title).toHaveTextContent('Agregar curso bíblico');
    });

    it('should render respective title when seletedCourse isnt empty', async () => {

        /* Mock data of useCourses */
        useCoursesSpy.mockImplementation(() => ({
            state: courseSelectedStateMock,
            saveCourse: jest.fn(),
            updateCourse: jest.fn()
        }) as any);

        renderScreen();

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title).toHaveTextContent('Editar curso bíblico');
    });
});