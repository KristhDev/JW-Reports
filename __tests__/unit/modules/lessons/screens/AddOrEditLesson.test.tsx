import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react-native';

/* Mocks */
import { lessonSelectedStateMock } from '../../../../mocks';

/* Modules */
import { AddOrEditLesson, useLessons } from '../../../../../src/modules/lessons';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/lessons/hooks/useLessons.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const renderScreen = () => render(<AddOrEditLesson />);

describe('Test in <AddOrEditLesson /> screen', () => {
    (useLessons as jest.Mock).mockReturnValue({
        state: {
            ...lessonSelectedStateMock,
            selectedLesson: {
                ...lessonSelectedStateMock.selectedLesson,
                next_lesson: '2022-12-29 00:00:00'
            }
        },
        saveLessons: jest.fn(),
        updateLessons: jest.fn()
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: jest.fn()
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderScreen();
        });

        await act(async () => {
            await waitFor(() => {
                expect(screen.toJSON()).toMatchSnapshot();
            });
        });
    });

    it('should render respective title when seletedLesson is empty', async () => {
        await waitFor(() => {
            renderScreen();
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Agregar clase para el curso');
    });

    it('should render respective title when seletedLesson isnt empty', async () => {

        /* Mock data of useLessons */
        (useLessons as jest.Mock).mockReturnValue({
            state: lessonSelectedStateMock,
            saveLessons: jest.fn(),
            updateLessons: jest.fn()
        });

        await waitFor(() => {
            renderScreen();
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Editar clase del curso');
    });
});