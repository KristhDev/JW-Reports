import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Mocks */
import {
    activeOrSuspendCourseMock,
    coursesStateMock,
    deleteCourseMock,
    finishOrStartCourseMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    loadCoursesMock,
    removeCoursesMock,
    removeLessonsMock,
    setCoursesPaginationMock,
    setLessonsPaginationMock,
    setRefreshCoursesMock,
    setSelectedCourseMock,
    setSelectedLessonMock,
    useCoursesSpy,
    useLessonsSpy,
    useNetworkSpy,
    useUISpy,
    wifiMock
} from '@mocks';

/* Features */
import { UI_INITIAL_STATE } from '@application/features';

/* Modules */
import { CoursesList } from '@courses';

const emptyMessageTest = 'No hay cursos disponibles';
const titleTest = 'Mis Cursos'.toUpperCase();

const user = userEvent.setup();

const renderComponent = () => render(
    <MenuProvider>
        <CoursesList
            emptyMessage={ emptyMessageTest }
            filter="all"
            title={ titleTest }
        />
    </MenuProvider>
);

describe('Test in <CoursesList /> component', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: coursesStateMock,
        activeOrSuspendCourse: activeOrSuspendCourseMock,
        deleteCourse: deleteCourseMock,
        finishOrStartCourse: finishOrStartCourseMock,
        loadCourses: loadCoursesMock,
        removeCourses: removeCoursesMock,
        setCoursesPagination: setCoursesPaginationMock,
        setRefreshCourses: setRefreshCoursesMock,
        setSelectedCourse: setSelectedCourseMock
    }) as any);

    useLessonsSpy.mockImplementation(() => ({
        state: initialLessonsStateMock,
        removeLessons: removeLessonsMock,
        setLessonsPagination: setLessonsPaginationMock,
        setSelectedLesson: setSelectedLessonMock
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
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent();

        /* Get title of list and check if is text pass for props */
        const titleText = screen.getByTestId('title-text');
        expect(titleText).toHaveTextContent(titleTest);
    });

    it('should render message when courses is empty', () => {

        /* Mock data of useCourses */
        useCoursesSpy.mockImplementation(() => ({
            state: initialCoursesStateMock,
            activeOrSuspendCourse: activeOrSuspendCourseMock,
            deleteCourse: deleteCourseMock,
            finishOrStartCourse: finishOrStartCourseMock,
            loadCourses: loadCoursesMock,
            removeCourses: removeCoursesMock,
            setCoursesPagination: setCoursesPaginationMock,
            setRefreshCourses: setRefreshCoursesMock,
            setSelectedCourse: setSelectedCourseMock,
        }) as any);

        useLessonsSpy.mockImplementation(() => ({
            state: initialLessonsStateMock,
            removeLessons: removeLessonsMock,
            setLessonsPagination: setLessonsPaginationMock,
            setSelectedLesson: setSelectedLessonMock,
        }) as any);

        renderComponent();

        /* Get empty message of list and check if is text pass for props */
        const emptyMsgText = screen.getByTestId('info-text-text');
        expect(emptyMsgText).toHaveTextContent(emptyMessageTest);
    });

    it('should render loading when isCoursesLoading is true', () => {

        /* Mock data of useCourses */
        useCoursesSpy.mockImplementation(() => ({
            state: {
                ...initialCoursesStateMock,
                isCoursesLoading: true
            },
            activeOrSuspendCourse: activeOrSuspendCourseMock,
            deleteCourse: deleteCourseMock,
            finishOrStartCourse: finishOrStartCourseMock,
            loadCourses: loadCoursesMock,
            removeCourses: removeCoursesMock,
            setCoursesPagination: setCoursesPaginationMock,
            setRefreshCourses: setRefreshCoursesMock,
            setSelectedCourse: setSelectedCourseMock
        }) as any);

        useLessonsSpy.mockImplementation(() => ({
            state: initialLessonsStateMock,
            removeLessons: removeLessonsMock,
            setLessonsPagination: setLessonsPaginationMock,
            setSelectedLesson: setSelectedLessonMock,
        }) as any);

        renderComponent();

        /* Get loader and check if exists in component */
        const loader = screen.getByTestId('loader');
        expect(loader).toBeTruthy();
    });

    it('should search when searchInput is submit', async () => {

        /* Mock data of useCourses */
        useCoursesSpy.mockImplementation(() => ({
            state: initialCoursesStateMock,
            activeOrSuspendCourse: activeOrSuspendCourseMock,
            deleteCourse: deleteCourseMock,
            finishOrStartCourse: finishOrStartCourseMock,
            loadCourses: loadCoursesMock,
            removeCourses: removeCoursesMock,
            setCoursesPagination: setCoursesPaginationMock,
            setRefreshCourses: setRefreshCoursesMock,
            setSelectedCourse: setSelectedCourseMock
        }) as any);

        renderComponent();

        /* Get search input text, type search and submit */
        const searchInput = screen.getByTestId('search-input-text-input');
        await user.type(searchInput, 'Test search', { submitEditing: true });

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