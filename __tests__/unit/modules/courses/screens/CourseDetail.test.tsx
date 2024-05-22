import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation, useCoursesSpy, useLessonsSpy } from '../../../../../jest.setup';

/* Mocks */
import { courseSelectedStateMock, setSelectedCourseMock, setSelectedLessonMock } from '../../../../mocks';

/* Modules */
import { CourseDetail } from '../../../../../src/modules/courses';
import { INIT_LESSON } from '../../../../../src/modules/lessons';

/* Utils */
import { date as dateUtil } from '../../../../../src/utils';

const user = userEvent.setup();
const renderScreen = () => render(<CourseDetail />);

describe('Test in <CourseDetail /> screen', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: courseSelectedStateMock,
        activeOrSuspendCourse: jest.fn(),
        finishOrStartCourse: jest.fn(),
        setSelectedCourse: setSelectedCourseMock,
    }) as any);

    useLessonsSpy.mockImplementation(() => ({
        setSelectedLesson: setSelectedLessonMock
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render course data', () => {
        renderScreen();

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
        const aboutSubtitle = screen.getByTestId('course-detail-about-subtitle');
        const aboutText = screen.getByTestId('course-detail-about-text');
        const addressText = screen.getByTestId('course-detail-address-text');
        const date = screen.getByTestId('course-detail-text-date');

        /* Check if title, publication and status are exists and contain respective values */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(selectedCourse.personName.toUpperCase());
        expect(publication).toBeOnTheScreen();
        expect(publication).toHaveTextContent(selectedCourse.publication.toUpperCase());
        expect(status).toBeOnTheScreen();
        expect(status).toHaveTextContent(`Estado del curso: ${ statusCourseText }`);

        /* Check if about section exists and contain respective value */
        expect(aboutSubtitle).toBeOnTheScreen();
        expect(aboutSubtitle).toHaveTextContent(`Información de ${ selectedCourse.personName }:`);
        expect(aboutText).toBeOnTheScreen();
        expect(aboutText).toHaveTextContent(selectedCourse.personAbout);

        /* Check if address section exists and contain respective value */
        expect(addressText).toBeOnTheScreen();
        expect(addressText).toHaveTextContent(selectedCourse.personAddress);

        /* Check if date exists and contain respective value */
        expect(date).toBeOnTheScreen();
        expect(date).toHaveTextContent(dateUtil.format(selectedCourse.createdAt, 'DD/MM/YYYY'));
    });

    it('should render respective touchable of flag course.finished', () => {
        renderScreen();

        const selectedCourse = courseSelectedStateMock.selectedCourse;

        const statusCourseAsk = (selectedCourse.finished)
            ? '¿Comenzar de nuevo?'
            : (selectedCourse.suspended)
                ? '¿Continuar?'
                : '¿Suspender?';

        /* Get touchable */
        const touchable = screen.getByTestId('course-detail-status-touchable');

        /* Check if toucable exists and contain respective ask */
        expect(touchable).toBeOnTheScreen();
        expect(touchable).toHaveTextContent(statusCourseAsk);
    });

    it('should render last lesson data if exists', () => {
        renderScreen();

        const lastLesson = courseSelectedStateMock.selectedCourse.lastLesson;

        if (!lastLesson) {
            expect(true).toBeTruthy();
            return;
        }

        const statusText =  (lastLesson.done)
            ? 'Clase impartida'
            : `Próxima clase ${ dateUtil.format(lastLesson.nextLesson, 'DD/MM/YYYY') }`

        /* Get elements with data of last lesson */
        const status = screen.getByTestId('course-detail-last-lesson-status');
        const description = screen.getByTestId('course-detail-last-lesson-description');

        /* Check if status and description exists and contain respective values */
        expect(status).toBeOnTheScreen();
        expect(status).toHaveTextContent(statusText);
        expect(description).toBeOnTheScreen();
        expect(description).toHaveTextContent(lastLesson.description);
    });

    it('should call navigate when lessons link is pressed', async () => {
        renderScreen();

        /* Get touchable */
        const touchable = screen.getByTestId('course-detail-lessons-touchable');
        await user.press(touchable);

        /* Check if navigate is called one time with respective value */
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('LessonsScreen');
    });

    it('should call setSelectedLesson and navigate when add lesson link is pressed', async () => {
        renderScreen();

        /* Get touchable */
        const touchable = screen.getByTestId('course-detail-add-lesson-touchable');
        await user.press(touchable);

        /* Check if selectedLesson is called one time with respective value */
        expect(setSelectedLessonMock).toHaveBeenCalledTimes(1);
        expect(setSelectedLessonMock).toHaveBeenCalledWith({
            ...INIT_LESSON,
            nextLesson: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });

        /* Check if navigate is called one time with respective value */
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('AddOrEditLessonScreen');
    });
});