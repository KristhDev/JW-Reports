import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Mocks */
import { courseSelectedStateMock, coursesStateMock, useCoursesSpy, useStatusSpy, useUISpy } from '@mocks';

/* Features */
import { UI_INITIAL_STATE } from '@application/features';

/* Modules */
import { AddOrEditCourse } from '@courses';

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

    useUISpy.mockImplementation(() => ({
        state: UI_INITIAL_STATE
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
        expect(title).toHaveTextContent('AGREGAR CURSO BÍBLICO');
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
        expect(title).toHaveTextContent('EDITAR CURSO BÍBLICO');
    });
});