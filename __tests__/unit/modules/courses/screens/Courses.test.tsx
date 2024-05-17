import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { useCoursesSpy, useLessonsSpy } from '../../../../../jest.setup';

/* Mocks */
import {
    coursesStateMock,
    initialLessonsStateMock,
    removeLessonsMock,
    setCoursesScreenHistoryMock,
    setLessonsPaginationMock,
    setSelectedCourseMock
} from '../../../../mocks';

/* Modules */
import { Courses, INIT_COURSE } from '../../../../../src/modules/courses';

const user = userEvent.setup();
const renderScreen = () => render(
    <MenuProvider>
        <Courses
            route={{
                name: 'CoursesScreen',
                params: {
                    title: 'TODOS MIS CURSOS',
                    emptyMessage: 'No has agregado ningún curso.',
                    filter: 'all',
                },
                key: 'CoursesScreen',
            }}
            navigation={{
                addListener: jest.fn(),
                canGoBack: jest.fn(),
                dispatch: jest.fn(),
                getId: jest.fn(),
                goBack: jest.fn(),
                isFocused: jest.fn(),
                navigate: jest.fn(),
                getParent: jest.fn(),
                getState: jest.fn(),
                jumpTo: jest.fn(),
                removeListener: jest.fn(),
                reset: jest.fn(),
                setOptions: jest.fn(),
                setParams: jest.fn()
            }}
        />
    </MenuProvider>
);

describe('Test in <Courses /> screen', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: coursesStateMock,
        activeOrSuspendCourse: jest.fn(),
        deleteCourse: jest.fn(),
        finishOrStartCourse: jest.fn(),
        loadCourses: jest.fn(),
        removeCourses: jest.fn(),
        setCoursesPagination: jest.fn(),
        setCoursesScreenHistory: setCoursesScreenHistoryMock,
        setRefreshCourses: jest.fn(),
        setSelectedCourse: setSelectedCourseMock,
    }) as any);

    useLessonsSpy.mockImplementation(() => ({
        state: initialLessonsStateMock,
        removeLessons: removeLessonsMock,
        setLessonsPagination: setLessonsPaginationMock,
        setSelectedLesson: jest.fn(),
    }) as any);


    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render add button when route name is CoursesScreen', async () => {
        renderScreen();

        /* Get touchable */
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];
        const icon = await addBtn.findByProps({ name: 'add-circle-outline' });

        /* Check if button is rendered */
        expect(addBtn).toBeTruthy();
        expect(icon.props).toHaveProperty('name', 'add-circle-outline');
    });

    it('should call setSelectedCourse when add button is pressed', async () => {
        renderScreen();

        /* Get touchable */
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];

        await user.press(addBtn);

        /* Check if setSelectedCourse is called one time with respective args */
        expect(setSelectedCourseMock).toHaveBeenCalledTimes(1);
        expect(setSelectedCourseMock).toHaveBeenCalledWith(INIT_COURSE)
    });
});