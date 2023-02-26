import React from 'react';
import { render, screen } from '@testing-library/react-native';
import dayjs from 'dayjs';

import { LessonDetail } from '../../../src/screens/courses';

import { lessonSelectedState } from '../../features/courses';

import { useCourses, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const setSelectedLessonMock = jest.fn();

jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <LessonDetail /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: lessonSelectedState,
        finishOrStartLesson: jest.fn(),
        setSelectedLesson: setSelectedLessonMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(<LessonDetail />);
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render lesson data', () => {
        const selectedCourse = lessonSelectedState.selectedCourse;
        const selectedLesson = lessonSelectedState.selectedLesson;
        const nextVisit = dayjs(selectedLesson.next_lesson);
        const statusLessonText = (selectedLesson.done) ? 'Impartida' : 'Por impartir';


        const title = screen.getByTestId('title-text');
        const publication = screen.getByTestId('info-text-text');
        const statusSection = screen.getByTestId('lesson-detail-status-section');
        const descriptionSection = screen.getByTestId('lesson-detail-description-section');
        const nextVisitText = screen.getByTestId('lesson-detail-next-visit-text');
        const createDate = screen.getByTestId('lesson-detail-date-created-text');

        expect(title).toBeTruthy();
        expect(title.props.children).toBe(`CLASE DEL CURSO CON ${ selectedCourse.person_name.toUpperCase() }`);
        expect(publication).toBeTruthy();
        expect(publication.props.children).toBe(selectedCourse.publication.toUpperCase());

        expect(statusSection).toBeTruthy();
        expect(statusSection.props.children[0].props.children.join('')).toBe(`Estado de la clase: ${ statusLessonText }`);
        expect(statusSection.props.children[1].props.children.props.children).toBe((!selectedLesson.done) ? '¿Terminar clase?' : '¿Reprogramar?');

        expect(descriptionSection).toBeTruthy();
        expect(descriptionSection.props.children[0].props.children).toBe((selectedLesson.done) ? 'Se analizo:' : 'Se analizará:');
        expect(descriptionSection.props.children[1].props.children).toBe(selectedLesson.description);

        expect(nextVisitText).toBeTruthy();
        expect(nextVisitText.props.children).toBe(`${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`);

        expect(createDate).toBeTruthy();
        expect(createDate.props.children).toBe(dayjs(selectedLesson.created_at).format('DD/MM/YYYY'));
    });

    it('should not call setSelectedLesson when index of state navigation is 4', () => {
        expect(setSelectedLessonMock).not.toHaveBeenCalled();
    });
});