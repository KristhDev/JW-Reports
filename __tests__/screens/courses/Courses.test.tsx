import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Features */
import { INIT_COURSE } from '../../../src/features/courses';
import { coursesState } from '../../features/courses';

/* Screens */
import { Courses } from '../../../src/screens/courses';

/* Hooks */
import { useCourses, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const setCoursesScreenHistoryMock = jest.fn();
const setSelectedCourseMock = jest.fn();

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Courses /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesState,
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

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(
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

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render add button when route name is CoursesScreen', () => {

        /* Get touchable */
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];

        /* Check if button is rendered */
        expect(addBtn).toBeTruthy();
        expect(addBtn.props.children[0].props.name).toBe('add-circle-outline');
    });

    it('should call setSelectedCourse when add button is pressed', () => {

        /* Get touchable */
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];

        fireEvent.press(addBtn);

        /* Check if setSelectedCourse is called one time with respective args */
        expect(setSelectedCourseMock).toHaveBeenCalledTimes(1);
        expect(setSelectedCourseMock).toHaveBeenCalledWith(INIT_COURSE)
    });
});