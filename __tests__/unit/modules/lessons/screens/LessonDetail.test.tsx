import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Mocks */
import { courseSelectedStateMock, lessonSelectedStateMock, setSelectedLessonMock } from '../../../../mocks';

/* Modules */
import { LessonDetail, useLessons } from '../../../../../src/modules/lessons';

/* Utils */
import { date } from '../../../../../src/utils';

/* Mock hooks */
jest.mock('../../../../../src/modules/lessons/hooks/useLessons.ts');

const renderScreen = () => render(<LessonDetail />);

describe('Test in <LessonDetail /> screen', () => {
    (useLessons as jest.Mock).mockReturnValue({
        state: lessonSelectedStateMock,
        finishOrStartLesson: jest.fn(),
        setSelectedLesson: setSelectedLessonMock
    });

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
        const nextVisit = date.format(selectedLesson.nextLesson, 'DD [de] MMMM [del] YYYY');
        const statusLessonText = (selectedLesson.done) ? 'Impartida' : 'Por impartir';

        /* Get elements to contain data of lesson */
        const title = screen.getByTestId('title-text');
        const publication = screen.getByTestId('info-text-text');
        const statusSection = screen.getByTestId('lesson-detail-status-section');
        const descriptionSection = screen.getByTestId('lesson-detail-description-section');
        const nextVisitText = screen.getByTestId('lesson-detail-next-visit-text');
        const createDate = screen.getByTestId('lesson-detail-date-created-text');

        /* Check if title and publication are exists and contain respective values */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(`CLASE DEL CURSO CON ${ selectedCourse.personName.toUpperCase() }`);
        expect(publication).toBeOnTheScreen();
        expect(publication).toHaveTextContent(selectedCourse.publication.toUpperCase());

        /* Check if status section exists and contain respective values */
        expect(statusSection).toBeOnTheScreen();
        expect(statusSection.props.children[0].props.children.join('')).toBe(`Estado de la clase: ${ statusLessonText }`);
        expect(statusSection.props.children[1].props.children.props.children).toBe((!selectedLesson.done) ? '¿Terminar clase?' : '¿Reprogramar?');

        /* Check if description section exists and contain respective values */
        expect(descriptionSection).toBeOnTheScreen();
        expect(descriptionSection.props.children[0].props.children).toBe((selectedLesson.done) ? 'Se analizo:' : 'Se analizará:');
        expect(descriptionSection.props.children[1].props.children).toBe(selectedLesson.description);

        /* Check if next visit text exists and contain respective values */
        expect(nextVisitText).toBeOnTheScreen();
        expect(nextVisitText).toHaveTextContent(nextVisit);

        /* Check if create date exists and contain respective values */
        expect(createDate).toBeOnTheScreen();
        expect(createDate).toHaveTextContent(date.format(selectedLesson.createdAt, 'DD/MM/YYYY'));
    });

    it('should not call setSelectedLesson when index of state navigation is 4', () => {
        renderScreen();

        /* Check if setSelectedLesson is not called */
        expect(setSelectedLessonMock).not.toHaveBeenCalled();
    });
});