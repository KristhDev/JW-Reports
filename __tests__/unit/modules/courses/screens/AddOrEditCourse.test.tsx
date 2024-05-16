import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';

/* Mocks */
import { courseSelectedStateMock, coursesStateMock } from '../../../../mocks';

/* Modules */
import { AddOrEditCourse, useCourses } from '../../../../../src/modules/courses';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const renderScreen = () => render(<AddOrEditCourse />);

describe('Test in <AddOrEditCourse /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesStateMock,
        saveCourse: jest.fn(),
        updateCourse: jest.fn()
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: jest.fn()
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderScreen();
        });

        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective title when seletedCourse is empty', async () => {
        await waitFor(() => {
            renderScreen();
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title).toHaveTextContent('Agregar curso bíblico');
    });

    it('should render respective title when seletedCourse isnt empty', async () => {

        /* Mock data of useCourses */
        (useCourses as jest.Mock).mockReturnValue({
            state: courseSelectedStateMock,
            saveCourse: jest.fn(),
            updateCourse: jest.fn()
        });

        await waitFor(() => {
            renderScreen();
        });


        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title).toHaveTextContent('Editar curso bíblico');
    });
});