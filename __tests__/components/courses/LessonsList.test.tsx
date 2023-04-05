import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

import { LessonsList } from '../../../src/components/courses';

import { courseSelectedState, lessonsState } from '../../features/courses';

import { useCourses, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const deleteLessonMock = jest.fn();
const loadLessonsMock = jest.fn();
const removeLessonsMock = jest.fn();
const setLessonsPaginationMock = jest.fn();
const setSelectedLessonMock = jest.fn();

const emptyMessageTest = 'No haz agregado clases a este curso.';
const titleTest = `Clases del curso con ${ lessonsState.selectedCourse.person_name }`;

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

        const titleText = getByTestId('title-text');
        expect(titleText.props.children).toBe(titleTest);
    });

    it('should render message when lessons is empty', () => {
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

        const emptyMsgText = getByTestId('info-text-text');
        expect(emptyMsgText.props.children).toBe(emptyMessageTest);
    });

    it('should render loading when isCoursesLoading is true', () => {
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

        const loader = getByTestId('loader');
        expect(loader).toBeTruthy();
    });

    it('should search when searchInput is submit', () => {
        const searchInput = screen.getByTestId('search-input-text-input');
        fireEvent(searchInput, 'onChangeText', 'Test search');
        fireEvent(searchInput, 'onSubmitEditing');

        expect(setLessonsPaginationMock).toHaveBeenCalledTimes(1);
        expect(setLessonsPaginationMock).toHaveBeenCalledWith({ from: 0, to: 9 });
        expect(removeLessonsMock).toHaveBeenCalledTimes(1);
        expect(loadLessonsMock).toHaveBeenCalledTimes(1);
        expect(loadLessonsMock).toHaveBeenCalledWith({
            search: 'Test search', refresh: true
        });
    });
});