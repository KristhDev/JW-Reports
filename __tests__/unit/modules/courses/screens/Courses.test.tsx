import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

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
import { Courses, INIT_COURSE, useCourses } from '../../../../../src/modules/courses';
import { useLessons } from '../../../../../src/modules/lessons';

/* Mock hooks */
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');
jest.mock('../../../../../src/modules/lessons/hooks/useLessons.ts');

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
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesStateMock,
        activeOrSuspendCourse: jest.fn(),
        deleteCourse: jest.fn(),
        finishOrStartCourse: jest.fn(),
        loadCourses: jest.fn(),
        removeCourses: jest.fn(),
        removeLessons: jest.fn(),
        setCoursesPagination: jest.fn(),
        setCoursesScreenHistory: setCoursesScreenHistoryMock,
        setLessonsPagination: jest.fn(),
        setRefreshCourses: jest.fn(),
        setSelectedCourse: setSelectedCourseMock,
        setSelectedLesson: jest.fn(),
    });

    (useLessons as jest.Mock).mockReturnValue({
        state: initialLessonsStateMock,
        removeLessons: removeLessonsMock,
        setLessonsPagination: setLessonsPaginationMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render add button when route name is CoursesScreen', () => {
        renderScreen();

        /* Get touchable */
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];
        const icon = addBtn.props.children[0].props.children[1];

        /* Check if button is rendered */
        expect(addBtn).toBeTruthy();
        expect(icon).toHaveProp('name', 'add-circle-outline');
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