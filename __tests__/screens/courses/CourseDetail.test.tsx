import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';
import dayjs from 'dayjs';

/* Screens */
import { CourseDetail } from '../../../src/screens/courses';

/* Hooks */
import { useCourses, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { navigateMock } from '../../../jest.setup';

/* Mocks */
import { courseSelectedStateMock, setSelectedCourseMock, setSelectedLessonMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <CourseDetail /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: courseSelectedStateMock,
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
        const selectedCourse = courseSelectedStateMock.selectedCourse;

        const statusCourseText = (selectedCourse.finished)
            ? 'Terminado'
            : (selectedCourse.suspended)
                ? 'Suspendido'
                : 'En curso';

        /* Get elements with data of course */
        const title = screen.getByTestId('title-text');
        const publication = screen.getByTestId('info-text-text');
        const status = screen.getByTestId('course-detail-status');
        const aboutSection = screen.getByTestId('course-detail-about-section');
        const addressSection = screen.getByTestId('course-detail-address-section');
        const date = screen.getByTestId('course-detail-text-date');

        /* Check if title, publication and status are exists and contain respective values */
        expect(title).toBeTruthy();
        expect(title.props.children).toBe(selectedCourse.personName.toUpperCase());
        expect(publication).toBeTruthy();
        expect(publication.props.children).toBe(selectedCourse.publication.toUpperCase());
        expect(status).toBeTruthy();
        expect(status.props.children.join('')).toBe(`Estado del curso: ${ statusCourseText }`);

        /* Check if about section exists and contain respective value */
        expect(aboutSection).toBeTruthy();
        expect(aboutSection.props.children[0].props.children.join('')).toBe(`Información de ${ selectedCourse.personName }:`);
        expect(aboutSection.props.children[1].props.children).toBe(selectedCourse.personAbout);

        /* Check if address section exists and contain respective value */
        expect(addressSection).toBeTruthy();
        expect(addressSection.props.children[0].props.children).toBe('Dirección:');
        expect(addressSection.props.children[1].props.children).toBe(selectedCourse.personAddress);

        /* Check if date exists and contain respective value */
        expect(date).toBeTruthy();
        expect(date.props.children).toBe(`${ dayjs(selectedCourse.createdAt).format('DD/MM/YYYY') }`);
    });

    it('should render respective touchable of flag course.finished', () => {
        const selectedCourse = courseSelectedStateMock.selectedCourse;

        const statusCourseAsk = (selectedCourse.finished)
            ? '¿Comenzar de nuevo?'
            : (selectedCourse.suspended)
                ? '¿Continuar?'
                : '¿Suspender?';

        /* Get touchable */
        const toucable = screen.getByTestId('course-detail-status-touchable');

        /* Check if toucable exists and contain respective ask */
        expect(toucable).toBeTruthy();
        expect(toucable.props.children[0].props.children).toBe(statusCourseAsk);
    });

    it('should render last_lesson data if exists', () => {
        const lastLesson = courseSelectedStateMock.selectedCourse.lastLesson;

        if (!lastLesson) {
            expect(true).toBeTruthy();
            return;
        }

        const statusText =  (lastLesson.done)
            ? 'Clase impartida'
            : `Próxima clase ${ dayjs(lastLesson.nextLesson).format('DD/MM/YYYY') }`

        /* Get elements with data of last lesson */
        const status = screen.getByTestId('course-detail-last-lesson-status');
        const description = screen.getByTestId('course-detail-last-lesson-description');

        /* Check if status and description exists and contain respective values */
        expect(status).toBeTruthy();
        expect(status.props.children).toBe(statusText);
        expect(description).toBeTruthy();
        expect(description.props.children).toBe(lastLesson.description);
    });

    it('should call navigate when lessons link is pressed', () => {

        /* Get touchable */
        const touchable = screen.getByTestId('course-detail-lessons-touchable');
        fireEvent.press(touchable);

        /* Check if navigate is called one time with respective value */
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('LessonsScreen');
    });

    it('should call setSelectedLesson and navigate when add lesson link is pressed', () => {

        /* Get touchable */
        const touchable = screen.getByTestId('course-detail-add-lesson-touchable');
        fireEvent.press(touchable);

        /* Check if selectedLesson is called one time with respective value */
        expect(setSelectedLessonMock).toHaveBeenCalledTimes(1);
        expect(setSelectedLessonMock).toHaveBeenCalledWith({
            ...courseSelectedStateMock.selectedLesson,
            nextLesson: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });

        /* Check if navigate is called one time with respective value */
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('AddOrEditLessonScreen');
    });
});