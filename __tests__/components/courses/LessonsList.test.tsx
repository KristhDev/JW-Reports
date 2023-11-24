import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Components */
import { LessonsList } from '../../../src/components/courses';

/* Hooks */
import { useCourses, useNetwork, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { courseSelectedStateMock, deleteLessonMock, finishOrStartLessonMock, lessonsStateMock, loadLessonsMock, removeLessonsMock, setLessonsPaginationMock, setSelectedLessonMock, wifiMock } from '../../mocks';

const emptyMessageTest = 'No haz agregado clases a este curso.';
const titleTest = `Clases del curso con ${ lessonsStateMock.selectedCourse.personName }`;

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useNetwork.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <LessonsList /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: lessonsStateMock,
        deleteLesson: deleteLessonMock,
        loadLessons: loadLessonsMock,
        removeLessons: removeLessonsMock,
        setLessonsPagination: setLessonsPaginationMock,
        setSelectedLesson: setSelectedLessonMock,
        finishOrStartLesson: finishOrStartLessonMock,
    });

    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        render(
            <MenuProvider>
                <LessonsList />
            </MenuProvider>
        );

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
            state: courseSelectedStateMock,
            deleteLesson: deleteLessonMock,
            loadLessons: loadLessonsMock,
            removeLessons: removeLessonsMock,
            setLessonsPagination: setLessonsPaginationMock,
            setSelectedLesson: setSelectedLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
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
                ...courseSelectedStateMock,
                isLessonsLoading: true
            },
            deleteLesson: deleteLessonMock,
            loadLessons: loadLessonsMock,
            removeLessons: removeLessonsMock,
            setLessonsPagination: setLessonsPaginationMock,
            setSelectedLesson: setSelectedLessonMock,
            finishOrStartLesson: finishOrStartLessonMock,
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
        render(
            <MenuProvider>
                <LessonsList />
            </MenuProvider>
        );

        /* Get search input text, type search and submit */
        const searchInput = screen.getByTestId('search-input-text-input');
        fireEvent(searchInput, 'onChangeText', 'Test search');
        fireEvent(searchInput, 'onSubmitEditing');

        /**
         * Check if setLessonsPagination, removeLessons and loadLessons is called
         * one time with respective args
         */
        expect(setLessonsPaginationMock).toHaveBeenCalledTimes(2);
        expect(setLessonsPaginationMock).toHaveBeenCalledWith({ from: 0, to: 9 });
        expect(removeLessonsMock).toHaveBeenCalledTimes(2);
        expect(loadLessonsMock).toHaveBeenCalledTimes(2);
        expect(loadLessonsMock).toHaveBeenCalledWith({
            search: 'Test search', refresh: true
        });
    });
});