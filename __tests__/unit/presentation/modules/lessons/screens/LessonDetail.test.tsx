import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Mocks */
import {
    courseSelectedStateMock,
    lessonSelectedStateMock,
    setSelectedLessonMock,
    useCoursesSpy,
    useLessonsSpy,
    useUISpy
} from '@mocks';

/* Features */
import { UI_INITIAL_STATE } from '@application/features';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Modules */
import { LessonDetail } from '@lessons';

const renderScreen = () => render(<LessonDetail />);

describe('Test in <LessonDetail /> screen', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: courseSelectedStateMock
    }) as any);

    useLessonsSpy.mockImplementation(() => ({
        state: lessonSelectedStateMock,
        finishOrStartLesson: jest.fn(),
        setSelectedLesson: setSelectedLessonMock
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: UI_INITIAL_STATE
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render lesson data', () => {
        renderScreen();

        const selectedCourse = courseSelectedStateMock.selectedCourse;
        const selectedLesson = lessonSelectedStateMock.selectedLesson;
        const nextVisit = Time.format(selectedLesson.nextLesson, 'DD [de] MMMM [del] YYYY');
        const statusLessonText = (selectedLesson.done) ? 'Impartida' : 'Por impartir';

        /* Get elements to contain data of lesson */
        const title = screen.getByTestId('title-text');
        const publication = screen.getByTestId('info-text-text');
        const statusText = screen.getByTestId('lesson-detail-status-text');
        const statusTextTouchable = screen.getByTestId('lesson-detail-status-text-touchable');
        const descriptionSubtitle = screen.getByTestId('lesson-detail-description-subtitle');
        const descriptionText = screen.getByTestId('lesson-detail-description-text');
        const nextVisitText = screen.getByTestId('lesson-detail-next-visit-text');
        const createDate = screen.getByTestId('lesson-detail-date-created-text');

        /* Check if title and publication are exists and contain respective values */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(`CLASE DEL CURSO CON ${ selectedCourse.personName.toUpperCase() }`);
        expect(publication).toBeOnTheScreen();
        expect(publication).toHaveTextContent(selectedCourse.publication.toUpperCase());

        /* Check if status section exists and contain respective values */
        expect(statusText).toBeOnTheScreen();
        expect(statusText).toHaveTextContent(`Estado de la clase: ${ statusLessonText }`);
        expect(statusTextTouchable).toBeOnTheScreen();
        expect(statusTextTouchable).toHaveTextContent((!selectedLesson.done) ? '¿Terminar clase?' : '¿Reprogramar?');

        /* Check if description section exists and contain respective values */
        expect(descriptionSubtitle).toBeOnTheScreen();
        expect(descriptionSubtitle).toHaveTextContent((selectedLesson.done) ? 'Se analizo:' : 'Se analizará:');
        expect(descriptionText).toBeOnTheScreen();
        expect(descriptionText).toHaveTextContent(selectedLesson.description);

        /* Check if next visit text exists and contain respective values */
        expect(nextVisitText).toBeOnTheScreen();
        expect(nextVisitText).toHaveTextContent(nextVisit);

        /* Check if create Time exists and contain respective values */
        expect(createDate).toBeOnTheScreen();
        expect(createDate).toHaveTextContent(Time.format(selectedLesson.createdAt, 'DD/MM/YYYY'));
    });

    it('should not call setSelectedLesson when index of state navigation is 4', () => {
        renderScreen();

        /* Check if setSelectedLesson is not called */
        expect(setSelectedLessonMock).not.toHaveBeenCalled();
    });
});