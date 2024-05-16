import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import dayjs from 'dayjs';

/* Setup */
import { useNavigationMock } from '../../../../../jest.setup';

/* Mocks */
import { courseSelectedStateMock, lessonSelectedStateMock, setSelectedCourseMock, setSelectedLessonMock } from '../../../../mocks';

/* Modules */
import { CourseDetail, useCourses } from '../../../../../src/modules/courses';
import { useLessons } from '../../../../../src/modules/lessons';

import { date as dateUtil } from '../../../../../src/utils';

/* Mock hooks */
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');
jest.mock('../../../../../src/modules/lessons/hooks/useLessons.ts');

const user = userEvent.setup();
const renderScreen = () => render(<CourseDetail />);

describe('Test in <CourseDetail /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: courseSelectedStateMock,
        activeOrSuspendCourse: jest.fn(),
        finishOrStartCourse: jest.fn(),
        setSelectedCourse: setSelectedCourseMock,
        setSelectedLesson: setSelectedLessonMock
    });

    (useLessons as jest.Mock).mockReturnValue({
        setSelectedLesson: setSelectedLessonMock
    });

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
        const title = screen.queryByTestId('title-text');
        const publication = screen.queryByTestId('info-text-text');
        const status = screen.queryByTestId('course-detail-status');
        const aboutSection = screen.queryByTestId('course-detail-about-section');
        const addressSection = screen.queryByTestId('course-detail-address-section');
        const date = screen.queryByTestId('course-detail-text-date');

        /* Check if title, publication and status are exists and contain respective values */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(selectedCourse.personName.toUpperCase());
        expect(publication).toBeOnTheScreen();
        expect(publication).toHaveTextContent(selectedCourse.publication.toUpperCase());
        expect(status).toBeOnTheScreen();
        expect(status).toHaveTextContent(`Estado del curso: ${ statusCourseText }`);

        /* Check if about section exists and contain respective value */
        expect(aboutSection).toBeOnTheScreen();
        expect(aboutSection!.props.children[0]).toHaveTextContent(`Información de ${ selectedCourse.personName }:`);
        expect(aboutSection!.props.children[1]).toHaveTextContent(selectedCourse.personAbout);

        /* Check if address section exists and contain respective value */
        expect(addressSection).toBeOnTheScreen();
        expect(addressSection!.props.children[0]).toHaveTextContent('Dirección:');
        expect(addressSection!.props.children[1]).toHaveTextContent(selectedCourse.personAddress);

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
        const toucable = screen.getByTestId('course-detail-status-touchable');

        /* Check if toucable exists and contain respective ask */
        expect(toucable).toBeOnTheScreen();
        expect(toucable.props.children[0]).toHaveTextContent(statusCourseAsk);
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
            : `Próxima clase ${ dayjs(lastLesson.nextLesson).format('DD/MM/YYYY') }`

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
        expect(useNavigationMock.navigate).toHaveBeenCalledTimes(1);
        expect(useNavigationMock.navigate).toHaveBeenCalledWith('LessonsScreen');
    });

    it('should call setSelectedLesson and navigate when add lesson link is pressed', async () => {
        renderScreen();

        /* Get touchable */
        const touchable = screen.getByTestId('course-detail-add-lesson-touchable');
        await user.press(touchable);

        /* Check if selectedLesson is called one time with respective value */
        expect(setSelectedLessonMock).toHaveBeenCalledTimes(1);
        expect(setSelectedLessonMock).toHaveBeenCalledWith({
            ...lessonSelectedStateMock.selectedLesson,
            nextLesson: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });

        /* Check if navigate is called one time with respective value */
        expect(useNavigationMock.navigate).toHaveBeenCalledTimes(1);
        expect(useNavigationMock.navigate).toHaveBeenCalledWith('AddOrEditLessonScreen');
    });
});