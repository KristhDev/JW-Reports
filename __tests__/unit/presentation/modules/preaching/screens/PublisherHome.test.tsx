import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { render, screen } from '@testing-library/react-native';

/* Mocks */
import {
    completeRevisitMock,
    coursesStateMock,
    deleteLessonMock,
    finishOrStartLessonMock,
    initialUIState,
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
    testUser,
    useAuthSpy,
    useCoursesSpy,
    useLessonsSpy,
    usePreachingSpy,
    useRevisitsSpy,
    useStatusSpy,
    useUISpy
} from '@mocks';

/* Features */
import { INIT_LESSON, INIT_REVISIT } from '@application/features';

/* Modules */
import { PublisherHome } from '@preaching';

const renderScreen = () => render(
    <MenuProvider>
        <PublisherHome />
    </MenuProvider>
);

describe('Test in <PublisherHome /> screen', () => {
    useAuthSpy.mockImplementation(() => ({
        state: { user: testUser },
    }) as any);

    useCoursesSpy.mockImplementation(() => ({
        state: coursesStateMock,
        saveCourse: saveCourseMock,
        setSelectedCourse: setSelectedCourseMock
    }) as any);

    useLessonsSpy.mockImplementation(() => ({
        state: lastLessonStateMock,
        deleteLesson: deleteLessonMock,
        finishOrStartLesson: finishOrStartLessonMock,
        loadLastLesson: loadLastLessonMock,
        setSelectedLesson: setSelectedLessonMock
    }) as any);

    usePreachingSpy.mockImplementation(() => ({
        state: preachingsStateMock
    }) as any);

    useRevisitsSpy.mockImplementation(() => ({
        state: lastRevisitStateMock,
        completeRevisit: completeRevisitMock,
        loadLastRevisit: loadLastRevisitMock,
        setSelectedRevisit: setSelectedRevisitMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setStatus: setStatusMock,
        setErrorForm: setErrorFormMock
    }) as any);

    useUISpy.mockImplementation(() => ({ state: initialUIState }) as any);

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render loadings', () => {
        useLessonsSpy.mockImplementation(() => ({
            state: {
                ...lastLessonStateMock,
                isLastLessonLoading: true
            },
            deleteLesson: deleteLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
            loadLastLesson: loadLastLessonMock,
            setSelectedLesson: setSelectedLessonMock,
        }) as any);

        useRevisitsSpy.mockImplementation(() => ({
            state: {
                ...lastRevisitStateMock,
                isLastRevisitLoading: true
            },
            completeRevisit: completeRevisitMock,
            loadLastRevisit: loadLastRevisitMock,
            setSelectedRevisit: setSelectedRevisitMock
        }) as any);

        renderScreen();

        const lastLessonLoading = screen.queryByTestId('last-lesson-loading');
        const lastRevisitLoading = screen.queryByTestId('last-revisit-loading');

        expect(lastLessonLoading).toBeOnTheScreen();
        expect(lastRevisitLoading).toBeOnTheScreen();
    });

    it('should render empty messages', () => {
        useLessonsSpy.mockImplementation(() => ({
            state: {
                ...lastLessonStateMock,
                lastLesson: INIT_LESSON
            },
            deleteLesson: deleteLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
            loadLastLesson: loadLastLessonMock,
            setSelectedLesson: setSelectedLessonMock
        }) as any);

        useRevisitsSpy.mockImplementation(() => ({
            state: {
                ...lastRevisitStateMock,
                lastRevisit: INIT_REVISIT
            },
            completeRevisit: completeRevisitMock,
            loadLastRevisit: loadLastRevisitMock,
            setSelectedRevisit: setSelectedRevisitMock
        }) as any);

        renderScreen();

        const emptyMessages = screen.queryAllByTestId('info-text-text');

        expect(emptyMessages[0]).toBeOnTheScreen();
        expect(emptyMessages[0]).toHaveTextContent('No has agregado ninguna lección para un curso biblíco.');
        expect(emptyMessages[1]).toBeOnTheScreen();
        expect(emptyMessages[1]).toHaveTextContent('No has agregado ninguna revisita.');
    });
});