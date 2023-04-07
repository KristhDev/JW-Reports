import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Components */
import { LessonsList } from '../../../src/components/courses';

/* Features */
import { courseSelectedState, lessonsState } from '../../features/courses';

/* Hooks */
import { useCourses, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const deleteLessonMock = jest.fn();
const loadLessonsMock = jest.fn();
const removeLessonsMock = jest.fn();
const setLessonsPaginationMock = jest.fn();
const setSelectedLessonMock = jest.fn();

const emptyMessageTest = 'No haz agregado clases a este curso.';
const titleTest = `Clases del curso con ${ lessonsState.selectedCourse.person_name }`;

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <LessonsList /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: lessonsState,
        deleteLesson: deleteLessonMock,
        loadLessons: loadLessonsMock,
        removeLessons: removeLessonsMock,
        setLessonsPagination: setLessonsPaginationMock,
        setSelectedLesson: setSelectedLessonMock,
        finishOrStartLesson: jest.fn(),
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(
            <MenuProvider>
                <LessonsList />
            </MenuProvider>
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        const { getByTestId } = render(
            <MenuProvider>
                <LessonsList />
            </MenuProvider>
        );

        /* Get title of list and check if is text pass for props */
        const titleText = getByTestId('title-text');
        expect(titleText.props.children).toBe(titleTest);
    });

    it('should render message when lessons is empty', () => {

        /* Mock data of useCourses */
        (useCourses as jest.Mock).mockReturnValue({
            state: courseSelectedState,
            deleteLesson: deleteLessonMock,
            loadLessons: loadLessonsMock,
            removeLessons: removeLessonsMock,
            setLessonsPagination: setLessonsPaginationMock,
            setSelectedLesson: setSelectedLessonMock,
            finishOrStartLesson: jest.fn(),
        });

        const { getByTestId } = render(
            <MenuProvider>
                <LessonsList />
            </MenuProvider>
        );

        /* Get empty message of list and check if is text pass for props */
        const emptyMsgText = getByTestId('info-text-text');
        expect(emptyMsgText.props.children).toBe(emptyMessageTest);
    });

    it('should render loading when isCoursesLoading is true', () => {

        /* Mock data of useCourses */
        (useCourses as jest.Mock).mockReturnValue({
            state: {
                ...courseSelectedState,
                isLessonsLoading: true
            },
            deleteLesson: deleteLessonMock,
            loadLessons: loadLessonsMock,
            removeLessons: removeLessonsMock,
            setLessonsPagination: setLessonsPaginationMock,
            setSelectedLesson: setSelectedLessonMock,
            finishOrStartLesson: jest.fn(),
        });

        const { getByTestId } = render(
            <MenuProvider>
                <LessonsList />
            </MenuProvider>
        );

        /* Get loader and check if exists in component */
        const loader = getByTestId('loader');
        expect(loader).toBeTruthy();
    });

    it('should search when searchInput is submit', () => {

        /* Get search input text, type search and submit */
        const searchInput = screen.getByTestId('search-input-text-input');
        fireEvent(searchInput, 'onChangeText', 'Test search');
        fireEvent(searchInput, 'onSubmitEditing');

        /**
         * Check if setLessonsPagination, removeLessons and loadLessons is called
         * one time with respective args
         */
        expect(setLessonsPaginationMock).toHaveBeenCalledTimes(1);
        expect(setLessonsPaginationMock).toHaveBeenCalledWith({ from: 0, to: 9 });
        expect(removeLessonsMock).toHaveBeenCalledTimes(1);
        expect(loadLessonsMock).toHaveBeenCalledTimes(1);
        expect(loadLessonsMock).toHaveBeenCalledWith({
            search: 'Test search', refresh: true
        });
    });
});