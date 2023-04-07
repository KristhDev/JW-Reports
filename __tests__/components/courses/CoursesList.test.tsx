import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Features */
import { initialState as coursesInitState, coursesState } from '../../features/courses';

/* Components */
import { CoursesList } from '../../../src/components/courses';

/* Hooks */
import { useCourses, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const setSelectedCourseMock = jest.fn();
const deleteCourseMock = jest.fn();
const loadCoursesMock = jest.fn();
const removeCoursesMock = jest.fn();
const removeLessonsMock = jest.fn();
const setCoursesPaginationMock = jest.fn();
const setLessonsPaginationMock = jest.fn();
const setRefreshCoursesMock = jest.fn();

const emptyMessageTest = 'No hay cursos disponibles';
const titleTest = 'Mis Cursos';

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <CoursesList /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesState,
        activeOrSuspendCourse: jest.fn(),
        deleteCourse: deleteCourseMock,
        finishOrStartCourse: jest.fn(),
        loadCourses: loadCoursesMock,
        removeCourses: removeCoursesMock,
        removeLessons: removeLessonsMock,
        setCoursesPagination: setCoursesPaginationMock,
        setLessonsPagination: setLessonsPaginationMock,
        setRefreshCourses: setRefreshCoursesMock,
        setSelectedCourse: setSelectedCourseMock,
        setSelectedLesson: jest.fn(),
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(
            <MenuProvider>
                <CoursesList
                    emptyMessage={ emptyMessageTest }
                    filter="all"
                    title={ titleTest }
                />
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
                <CoursesList
                    emptyMessage={ emptyMessageTest }
                    filter="all"
                    title={ titleTest }
                />
            </MenuProvider>
        );

        /* Get title of list and check if is text pass for props */
        const titleText = getByTestId('title-text');
        expect(titleText.props.children).toBe(titleTest);
    });

    it('should render message when courses is empty', () => {

        /* Mock data of useCourses */
        (useCourses as jest.Mock).mockReturnValue({
            state: coursesInitState,
            activeOrSuspendCourse: jest.fn(),
            deleteCourse: deleteCourseMock,
            finishOrStartCourse: jest.fn(),
            loadCourses: loadCoursesMock,
            removeCourses: removeCoursesMock,
            removeLessons: removeLessonsMock,
            setCoursesPagination: setCoursesPaginationMock,
            setLessonsPagination: setLessonsPaginationMock,
            setRefreshCourses: setRefreshCoursesMock,
            setSelectedCourse: setSelectedCourseMock,
            setSelectedLesson: jest.fn(),
        });

        const { getByTestId } = render(
            <MenuProvider>
                <CoursesList
                    emptyMessage={ emptyMessageTest }
                    filter="all"
                    title={ titleTest }
                />
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
                ...coursesInitState,
                isCoursesLoading: true
            },
            activeOrSuspendCourse: jest.fn(),
            deleteCourse: deleteCourseMock,
            finishOrStartCourse: jest.fn(),
            loadCourses: loadCoursesMock,
            removeCourses: removeCoursesMock,
            removeLessons: removeLessonsMock,
            setCoursesPagination: setCoursesPaginationMock,
            setLessonsPagination: setLessonsPaginationMock,
            setRefreshCourses: setRefreshCoursesMock,
            setSelectedCourse: setSelectedCourseMock,
            setSelectedLesson: jest.fn(),
        });

        const { getByTestId } = render(
            <MenuProvider>
                <CoursesList
                    emptyMessage={ emptyMessageTest }
                    filter="all"
                    title={ titleTest }
                />
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
         * Check if setCoursesPagination, removeCourses and loadCourses is called
         * one time with respective args
         */
        expect(setCoursesPaginationMock).toHaveBeenCalledTimes(1);
        expect(setCoursesPaginationMock).toHaveBeenCalledWith({ from: 0, to: 9 });
        expect(removeCoursesMock).toHaveBeenCalledTimes(1);
        expect(loadCoursesMock).toHaveBeenCalledTimes(1);
        expect(loadCoursesMock).toHaveBeenCalledWith({
            filter: 'all', search: 'Test search', refresh: true
        });
    });
});