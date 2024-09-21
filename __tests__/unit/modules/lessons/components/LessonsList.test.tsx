import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Setup */
import { useCoursesSpy, useLessonsSpy, useNetworkSpy, useUISpy } from '@test-setup';

/* Mocks */
import {
    courseSelectedStateMock,
    deleteLessonMock,
    finishOrStartLessonMock,
    initialLessonsStateMock,
    lessonsStateMock,
    loadLessonsMock,
    removeLessonsMock,
    setLessonsPaginationMock,
    setSelectedLessonMock,
    wifiMock
} from '@mocks';

/* Modules */
import { LessonsList } from '@lessons';
import { UI_INITIAL_STATE } from '@ui';

const emptyMessageTest = 'No has agregado clases a este curso.';
const titleTest = `Clases del curso con ${ courseSelectedStateMock.selectedCourse.personName }`.toUpperCase();

const user = userEvent.setup();
const renderScreen = () => render(
    <MenuProvider>
        <LessonsList />
    </MenuProvider>
);

describe('Test in <LessonsList /> component', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: courseSelectedStateMock
    }) as any);

    useLessonsSpy.mockImplementation(() => ({
        state: lessonsStateMock,
        deleteLesson: deleteLessonMock,
        loadLessons: loadLessonsMock,
        removeLessons: removeLessonsMock,
        setLessonsPagination: setLessonsPaginationMock,
        setSelectedLesson: setSelectedLessonMock,
        finishOrStartLesson: finishOrStartLessonMock,
    }) as any);

    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: UI_INITIAL_STATE
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderScreen();

        /* Get title of list and check if is text pass for props */
        const titleText = screen.getByTestId('title-text');

        expect(titleText).toBeOnTheScreen();
        expect(titleText).toHaveTextContent(titleTest);
    });

    it('should render message when lessons is empty', () => {

        /* Mock data of useLessons */
        useLessonsSpy.mockImplementation(() => ({
            state: initialLessonsStateMock,
            deleteLesson: deleteLessonMock,
            loadLessons: loadLessonsMock,
            removeLessons: removeLessonsMock,
            setLessonsPagination: setLessonsPaginationMock,
            setSelectedLesson: setSelectedLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
        }) as any);

        renderScreen();

        /* Get empty message of list and check if is text pass for props */
        const emptyMsgText = screen.getByTestId('info-text-text');

        expect(emptyMsgText).toBeOnTheScreen();
        expect(emptyMsgText).toHaveTextContent(emptyMessageTest);
    });

    it('should render loading when isLessonsLoading is true', () => {

        /* Mock data of useLessons */
        useLessonsSpy.mockImplementation(() => ({
            state: {
                ...initialLessonsStateMock,
                isLessonsLoading: true
            },
            deleteLesson: deleteLessonMock,
            loadLessons: loadLessonsMock,
            removeLessons: removeLessonsMock,
            setLessonsPagination: setLessonsPaginationMock,
            setSelectedLesson: setSelectedLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
        }) as any);

        renderScreen();

        /* Get loader and check if exists in component */
        const loader = screen.getByTestId('loader');
        expect(loader).toBeOnTheScreen();
    });

    it('should search when searchInput is submit', async () => {
        /* Mock data of useLessons */
        useLessonsSpy.mockImplementation(() => ({
            state: {
                ...initialLessonsStateMock,
                isLessonsLoading: false,
                lessons: [],
            },
            deleteLesson: deleteLessonMock,
            loadLessons: loadLessonsMock,
            removeLessons: removeLessonsMock,
            setLessonsPagination: setLessonsPaginationMock,
            setSelectedLesson: setSelectedLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
        }) as any);

        renderScreen();

        /* Get search input text, type search and submit */
        const searchInput = screen.getByTestId('search-input-text-input');
        await user.type(searchInput, 'Test search', { submitEditing: true });

        /**
         * Check if setLessonsPagination, removeLessons and loadLessons is called
         * one time with respective args
         */
        expect(setLessonsPaginationMock).toHaveBeenCalledTimes(2);
        expect(setLessonsPaginationMock).toHaveBeenCalledWith({ from: 0, to: 9 });
        expect(removeLessonsMock).toHaveBeenCalledTimes(2);
        expect(loadLessonsMock).toHaveBeenCalledTimes(2);
        expect(loadLessonsMock).toHaveBeenCalledWith({ search: 'Test search', refresh: true });
    });
});