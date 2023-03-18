import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

import { CourseCard } from '../../../src/components/courses';

import { coursesState } from '../../features/courses';

import { useCourses, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

import { navigateMock } from '../../../jest.setup';

const course = coursesState.courses[0];

const setSelectedCourseMock = jest.fn();

jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <CourseCard /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesState,
        setSelectedLesson: jest.fn(),
        setSelectedCourse: setSelectedCourseMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(
            <MenuProvider>
                <CourseCard
                    course={ course }
                    onActiveOrSuspend={ jest.fn() }
                    onDelete={ jest.fn() }
                    onFinishOrStart={ jest.fn() }
                />
            </MenuProvider>
        )
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render data of course', () => {
        const statusText = screen.getByTestId('course-card-status-text');
        const personNameText = screen.getByTestId('course-card-name-text');
        const publicationText = screen.getByTestId('course-card-publication-text');
        const aboutText = screen.getByTestId('course-card-about-text');

        expect(statusText).toBeTruthy();
        expect(statusText.props.children).toBe('En Curso');
        expect(personNameText).toBeTruthy();
        expect(personNameText.props.children).toBe(course.person_name);
        expect(publicationText).toBeTruthy();
        expect(publicationText.props.children).toBe(course.publication);
        expect(aboutText).toBeTruthy();
        expect(typeof aboutText.props.children).toBe('string');
    });

    it('should call setSelectedCourse and navigate when card is pressed', () => {
        const touchable = screen.getByTestId('course-card-touchable');
        fireEvent.press(touchable);

        expect(setSelectedCourseMock).toHaveBeenCalledTimes(1);
        expect(setSelectedCourseMock).toHaveBeenCalledWith(course);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('CourseDetailScreen');
    });
});