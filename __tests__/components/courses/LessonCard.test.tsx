import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import dayjs from 'dayjs';

/* Components */
import { LessonCard } from '../../../src/components/courses';

/* Hooks */
import { useCourses, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { navigateMock } from '../../../jest.setup';

/* Mocks */
import { lessonsMock, setSelectedLessonMock } from '../../mocks';

const lesson = lessonsMock[0];

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <LessonCard /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        setSelectedLesson: setSelectedLessonMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(
            <MenuProvider>
                <LessonCard
                    lesson={ lesson }
                    onDelete={ jest.fn() }
                    onFinish={ jest.fn() }
                    screenToNavigate="LessonDetailScreen"
                />
            </MenuProvider>
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render data of lesson', () => {

        /* Get elements with data of lesson */
        const statusText = screen.getByTestId('lesson-card-status-text');
        const descriptionText = screen.getByTestId('lesson-card-description-text');

        const nextVisit = dayjs(lesson.nextLesson);

        /* Check if elemets exists and containt content of lesson */
        expect(statusText).toBeTruthy();
        expect(statusText.props.children).toBe(`Clase para el ${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`);
        expect(descriptionText).toBeTruthy();
        expect(typeof descriptionText.props.children).toBe('string');
    });

    it('should call setSelectedLesson and navigate when card is pressed', () => {

        /* Get touchable card */
        const touchable = screen.getByTestId('lesson-card-touchable');
        fireEvent.press(touchable);

        /**
         * Check if setSelectedLesson and navigate are called one time
         * with respective args
         */
        expect(setSelectedLessonMock).toHaveBeenCalledTimes(1);
        expect(setSelectedLessonMock).toHaveBeenCalledWith(lesson);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('LessonDetailScreen');
    });
});