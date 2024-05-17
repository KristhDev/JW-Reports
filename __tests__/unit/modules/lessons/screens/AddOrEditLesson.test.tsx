import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Setup */
import { useLessonsSpy, useStatusSpy } from '../../../../../jest.setup';

/* Mocks */
import { initialLessonsStateMock, lessonSelectedStateMock } from '../../../../mocks';

/* Modules */
import { AddOrEditLesson } from '../../../../../src/modules/lessons';

const renderScreen = () => render(<AddOrEditLesson />);

describe('Test in <AddOrEditLesson /> screen', () => {
    useLessonsSpy.mockImplementation(() => ({
        state: {
            ...initialLessonsStateMock,
            selectedLesson: {
                ...initialLessonsStateMock.selectedLesson,
                next_lesson: '2022-12-29 00:00:00'
            }
        },
        saveLessons: jest.fn(),
        updateLessons: jest.fn()
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: jest.fn()
    }) as any);

    it('should to match snapshot', async () => {
        renderScreen();

        await act(async () => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title when seletedLesson is empty', async () => {
        renderScreen();

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Agregar clase para el curso');
    });

    it('should render respective title when seletedLesson isnt empty', async () => {

        /* Mock data of useLessons */
        useLessonsSpy.mockImplementation(() => ({
            state: lessonSelectedStateMock,
            saveLessons: jest.fn(),
            updateLessons: jest.fn()
        }) as any);

        renderScreen();

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Editar clase del curso');
    });
});