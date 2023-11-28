import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { render, screen } from '@testing-library/react-native';

/* Screens */
import { PublisherHome } from '../../../src/screens/preaching';

/* Features */
import { INIT_LESSON, INIT_REVISIT } from '../../../src/features';

/* Hooks */
import { useAuth, useCourses, usePreaching, useRevisits, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import {
    completeRevisitMock,
    deleteLessonMock,
    finishOrStartLessonMock,
    lastLessonStateMock,
    lastRevisitStateMock,
    loadLastLessonMock,
    loadLastRevisitMock,
    preachingsStateMock,
    saveCourseMock,
    setErrorFormMock,
    setSelectedCourseMock,
    setSelectedLessonMock,
    setSelectedRevisitMock,
    setStatusMock,
    testUser
} from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/usePreaching.ts');
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <PublisherHome /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { user: testUser },
    });

    (useCourses as jest.Mock).mockReturnValue({
        state: lastLessonStateMock,
        deleteLesson: deleteLessonMock,
        finishOrStartLesson: finishOrStartLessonMock,
        loadLastLesson: loadLastLessonMock,
        saveCourse: saveCourseMock,
        setSelectedCourse: setSelectedCourseMock,
        setSelectedLesson: setSelectedLessonMock,
    });

    (usePreaching as jest.Mock).mockReturnValue({
        state: preachingsStateMock
    });

    (useRevisits as jest.Mock).mockReturnValue({
        state: lastRevisitStateMock,
        completeRevisit: completeRevisitMock,
        loadLastRevisit: loadLastRevisitMock,
        setSelectedRevisit: setSelectedRevisitMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setStatus: setStatusMock,
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors, selectedTheme: 'dark' },
        BUTTON_TRANSLUCENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    it('should to match snapshot', () => {
        render(
            <MenuProvider>
                <PublisherHome />
            </MenuProvider>
        );

        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render loadings', () => {
        (useCourses as jest.Mock).mockReturnValue({
            state: {
                ...lastLessonStateMock,
                isLastLessonLoading: true
            },
            deleteLesson: deleteLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
            loadLastLesson: loadLastLessonMock,
            saveCourse: saveCourseMock,
            setSelectedCourse: setSelectedCourseMock,
            setSelectedLesson: setSelectedLessonMock,
        });

        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...lastRevisitStateMock,
                isLastRevisitLoading: true
            },
            completeRevisit: completeRevisitMock,
            loadLastRevisit: loadLastRevisitMock,
            setSelectedRevisit: setSelectedRevisitMock
        });


        render(
            <MenuProvider>
                <PublisherHome />
            </MenuProvider>
        );

        const lastLessonLoading = screen.queryByTestId('last-lesson-loading');
        const lastRevisitLoading = screen.queryByTestId('last-revisit-loading');

        expect(lastLessonLoading).toBeTruthy();
        expect(lastRevisitLoading).toBeTruthy();
    });

    it('should render empty messages', () => {
        (useCourses as jest.Mock).mockReturnValue({
            state: {
                ...lastLessonStateMock,
                lastLesson: INIT_LESSON
            },
            deleteLesson: deleteLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
            loadLastLesson: loadLastLessonMock,
            saveCourse: saveCourseMock,
            setSelectedCourse: setSelectedCourseMock,
            setSelectedLesson: setSelectedLessonMock,
        });

        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...lastRevisitStateMock,
                lastRevisit: INIT_REVISIT
            },
            completeRevisit: completeRevisitMock,
            loadLastRevisit: loadLastRevisitMock,
            setSelectedRevisit: setSelectedRevisitMock
        });

        render(
            <MenuProvider>
                <PublisherHome />
            </MenuProvider>
        );

        const emptyMessages = screen.queryAllByTestId('info-text-text');

        expect(emptyMessages[0]).toBeTruthy();
        expect(emptyMessages[0].props.children).toBe('No haz agregado ninguna lección para un curso biblíco.');
        expect(emptyMessages[1]).toBeTruthy();
        expect(emptyMessages[1].props.children).toBe('No haz agregado ninguna revisita.');
    });
});