import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

import { INIT_COURSE } from '../../../src/features/courses';
import { coursesState } from '../../features/courses';

import { Courses } from '../../../src/screens/courses';

import { useCourses, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const setCoursesScreenHistoryMock = jest.fn();
const setSelectedCourseMock = jest.fn();

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
                            emptyMessage: 'No haz agregado ningún curso.',
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
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];

        expect(addBtn).toBeTruthy();
        expect(addBtn.props.children[0].props.name).toBe('add-circle-outline');
    });

    it('should call setSelectedCourse when add button is pressed', () => {
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];

        fireEvent.press(addBtn);

        expect(setSelectedCourseMock).toHaveBeenCalledTimes(1);
        expect(setSelectedCourseMock).toHaveBeenCalledWith(INIT_COURSE)
    });
});