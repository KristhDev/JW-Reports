import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';
import dayjs from 'dayjs';

import { CourseDetail } from '../../../src/screens/courses';

import { courseSelectedState } from '../../features/courses';

import { useCourses, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

import { navigateMock } from '../../../jest.setup';

const setSelectedCourseMock = jest.fn();
const setSelectedLessonMock = jest.fn();

jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <CourseDetail /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: courseSelectedState,
        activeOrSuspendCourse: jest.fn(),
        finishOrStartCourse: jest.fn(),
        setSelectedCourse: setSelectedCourseMock,
        setSelectedLesson: setSelectedLessonMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSLUCENT_COLOR: hexToRgba(darkColors.button, 0.50),
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(<CourseDetail />);

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render course data', () => {
        const selectedCourse = courseSelectedState.selectedCourse;

        const statusCourseText = (selectedCourse.finished)
            ? 'Terminado'
            : (selectedCourse.suspended)
                ? 'Suspendido'
                : 'En curso';

        const title = screen.getByTestId('title-text');
        const publication = screen.getByTestId('info-text-text');
        const status = screen.getByTestId('course-detail-status');
        const aboutSection = screen.getByTestId('course-detail-about-section');
        const addressSection = screen.getByTestId('course-detail-address-section');
        const date = screen.getByTestId('course-detail-text-date');

        expect(title).toBeTruthy();
        expect(title.props.children).toBe(selectedCourse.person_name.toUpperCase());
        expect(publication).toBeTruthy();
        expect(publication.props.children).toBe(selectedCourse.publication.toUpperCase());
        expect(status).toBeTruthy();
        expect(status.props.children.join('')).toBe(`Estado del curso: ${ statusCourseText }`);

        expect(aboutSection).toBeTruthy();
        expect(aboutSection.props.children[0].props.children.join('')).toBe(`Información de ${ selectedCourse.person_name }:`);
        expect(aboutSection.props.children[1].props.children).toBe(selectedCourse.person_about);

        expect(addressSection).toBeTruthy();
        expect(addressSection.props.children[0].props.children).toBe('Dirección:');
        expect(addressSection.props.children[1].props.children).toBe(selectedCourse.person_address);

        expect(date).toBeTruthy();
        expect(date.props.children).toBe(`${ dayjs(selectedCourse.created_at).format('DD/MM/YYYY') }`);
    });

    it('should render respective touchable of flag course.finished', () => {
        const selectedCourse = courseSelectedState.selectedCourse;

        const statusCourseAsk = (selectedCourse.finished)
            ? '¿Comenzar de nuevo?'
            : (selectedCourse.suspended)
                ? '¿Continuar?'
                : '¿Suspender?';

        const toucable = screen.getByTestId('course-detail-status-touchable');

        expect(toucable).toBeTruthy();
        expect(toucable.props.children[0].props.children).toBe(statusCourseAsk);
    });

    it('should render last_lesson data if exists', () => {
        const lastLesson = courseSelectedState.selectedCourse.last_lesson;

        if (!lastLesson) {
            expect(true).toBeTruthy();
            return;
        }

        const statusText =  (lastLesson.done)
            ? 'Clase impartida'
            : `Próxima clase ${ dayjs(lastLesson.next_lesson).format('DD/MM/YYYY') }`

        const status = screen.getByTestId('course-detail-last-lesson-status');
        const description = screen.getByTestId('course-detail-last-lesson-description');

        expect(status).toBeTruthy();
        expect(status.props.children).toBe(statusText);
        expect(description).toBeTruthy();
        expect(description.props.children).toBe(lastLesson.description);
    });

    it('should call navigate when lessons link is pressed', () => {
        const touchable = screen.getByTestId('course-detail-lessons-touchable');
        fireEvent.press(touchable);

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('LessonsScreen');
    });

    it('should call setSelectedLesson and navigate when add lesson link is pressed', () => {
        const touchable = screen.getByTestId('course-detail-add-lesson-touchable');
        fireEvent.press(touchable);

        expect(setSelectedLessonMock).toHaveBeenCalledTimes(1);
        expect(setSelectedLessonMock).toHaveBeenCalledWith({
            ...courseSelectedState.selectedLesson,
            next_lesson: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String)
        });

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('AddOrEditLessonScreen');
    });
});