import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Setup */
import { useLessonsSpy, useStatusSpy, useUISpy } from '@test-setup';

/* Mocks */
import { initialLessonsStateMock, lessonSelectedStateMock } from '@mocks';

/* Modules */
import { AddOrEditLesson } from '@lessons';
import { UI_INITIAL_STATE } from '@ui';

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

    useUISpy.mockImplementation(() => ({
        state: UI_INITIAL_STATE
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
        expect(title).toHaveTextContent('AGREGAR CLASE AL CURSO');
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
        expect(title).toHaveTextContent('EDITAR CLASE DEL CURSO');
    });
});