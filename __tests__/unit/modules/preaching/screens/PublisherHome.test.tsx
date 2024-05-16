import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { render, screen } from '@testing-library/react-native';

/* Mocks */
import {
    completeRevisitMock,
    coursesStateMock,
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
} from '../../../../mocks';

/* Modules */
import { useAuth } from '../../../../../src/modules/auth';
import { PublisherHome, usePreaching } from '../../../../../src/modules/preaching';
import { useCourses } from '../../../../../src/modules/courses';
import { INIT_REVISIT, useRevisits } from '../../../../../src/modules/revisits';
import { useStatus } from '../../../../../src/modules/shared';
import { INIT_LESSON, useLessons } from '../../../../../src/modules/lessons';

/* Mock hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');
jest.mock('../../../../../src/modules/lessons/hooks/useLessons.ts');
jest.mock('../../../../../src/modules/preaching/hooks/usePreaching.ts');
jest.mock('../../../../../src/modules/revisits/hooks/useRevisits.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const renderScreen = () => render(
    <MenuProvider>
        <PublisherHome />
    </MenuProvider>
);

describe('Test in <PublisherHome /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { user: testUser },
    });

    (useCourses as jest.Mock).mockReturnValue({
        state: coursesStateMock,
        saveCourse: saveCourseMock,
        setSelectedCourse: setSelectedCourseMock,
    });

    (useLessons as jest.Mock).mockReturnValue({
        state: lastLessonStateMock,
        deleteLesson: deleteLessonMock,
        finishOrStartLesson: finishOrStartLessonMock,
        loadLastLesson: loadLastLessonMock,
        setSelectedLesson: setSelectedLessonMock
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

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render loadings', () => {
        (useLessons as jest.Mock).mockReturnValue({
            state: {
                ...lastRevisitStateMock,
                isLastRevisitLoading: true
            },
            deleteLesson: deleteLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
            loadLastLesson: loadLastLessonMock,
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

        renderScreen();

        const lastLessonLoading = screen.queryByTestId('last-lesson-loading');
        const lastRevisitLoading = screen.queryByTestId('last-revisit-loading');

        expect(lastLessonLoading).toBeOnTheScreen();
        expect(lastRevisitLoading).toBeOnTheScreen();
    });

    it('should render empty messages', () => {
        (useLessons as jest.Mock).mockReturnValue({
            state: {
                ...lastLessonStateMock,
                lastLesson: INIT_LESSON
            },
            deleteLesson: deleteLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
            loadLastLesson: loadLastLessonMock,
            setSelectedLesson: setSelectedLessonMock
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

        renderScreen();

        const emptyMessages = screen.queryAllByTestId('info-text-text');

        expect(emptyMessages[0]).toBeOnTheScreen();
        expect(emptyMessages[0]).toHaveTextContent('No haz agregado ninguna lección para un curso biblíco.');
        expect(emptyMessages[1]).toBeOnTheScreen();
        expect(emptyMessages[1]).toHaveTextContent('No haz agregado ninguna revisita.');
    });
});