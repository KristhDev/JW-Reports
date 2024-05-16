import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import dayjs from 'dayjs';

/* Setup */
import { useNavigationMock } from '../../../../../jest.setup';

/* Mocks */
import { lessonsMock, setSelectedLessonMock } from '../../../../mocks';

/* Modules */
import { LessonCard, useLessons } from '../../../../../src/modules/lessons';

/* Mock hooks */
jest.mock('../../../../../src/modules/lessons/hooks/useLessons.ts');

const lesson = lessonsMock[0];

const user = userEvent.setup();
const renderScreen = () => render(
    <MenuProvider>
        <LessonCard
            lesson={ lesson }
            onDelete={ jest.fn() }
            onFinish={ jest.fn() }
            screenToNavigate="LessonDetailScreen"
        />
    </MenuProvider>
);

describe('Test in <LessonCard /> component', () => {
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

    it('should render data of lesson', () => {
        renderScreen();

        /* Get elements with data of lesson */
        const statusText = screen.getByTestId('lesson-card-status-text');
        const descriptionText = screen.getByTestId('lesson-card-description-text');

        const nextVisit = dayjs(lesson.nextLesson);

        /* Check if elemets exists and containt content of lesson */
        expect(statusText).toBeTruthy();
        expect(statusText).toHaveTextContent(`Clase para el ${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`);
        expect(descriptionText).toBeTruthy();
        expect(typeof descriptionText.props.children).toBe('string');
    });

    it('should call setSelectedLesson and navigate when card is pressed', () => {
        renderScreen();

        /* Get touchable card */
        const pressable = screen.getByTestId('lesson-card-touchable');
        user.press(pressable);

        /**
         * Check if setSelectedLesson and navigate are called one time
         * with respective args
         */
        expect(setSelectedLessonMock).toHaveBeenCalledTimes(1);
        expect(setSelectedLessonMock).toHaveBeenCalledWith(lesson);
        expect(useNavigationMock.navigate).toHaveBeenCalledTimes(1);
        expect(useNavigationMock.navigate).toHaveBeenCalledWith('LessonDetailScreen');
    });
});