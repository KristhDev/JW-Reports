import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Mocks */
import { lessonsMock, navigateToDetailMock, navigateToEditMock, setSelectedLessonMock, useLessonsSpy } from '@mocks';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Modules */
import { LessonCard } from '@lessons';

const lesson = lessonsMock[0];

const user = userEvent.setup();
const renderScreen = () => render(
    <MenuProvider>
        <LessonCard
            lesson={ lesson }
            navigateToDetail={ navigateToDetailMock }
            navigateToEdit={ navigateToEditMock }
            onDelete={ jest.fn() }
            onFinish={ jest.fn() }
        />
    </MenuProvider>
);

describe('Test in <LessonCard /> component', () => {
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

    it('should render data of lesson', () => {
        renderScreen();

        /* Get elements with data of lesson */
        const statusText = screen.getByTestId('lesson-card-status-text');
        const descriptionText = screen.getByTestId('lesson-card-description-text');

        const nextVisit = Time.format(lesson.nextLesson, '[Clase] [para] [el] DD [de] MMMM [del] YYYY');

        /* Check if elemets exists and containt content of lesson */
        expect(statusText).toBeOnTheScreen();
        expect(statusText).toHaveTextContent(nextVisit);
        expect(descriptionText).toBeTruthy();
        expect(typeof descriptionText.type).toBe('string');
    });

    it('should call setSelectedLesson and navigate when card is pressed', async () => {
        renderScreen();

        /* Get pressable card */
        const pressable = screen.getByTestId('lesson-card-pressable');
        await user.press(pressable);

        /**
         * Check if setSelectedLesson and navigate are called one time
         * with respective args
         */
        expect(setSelectedLessonMock).toHaveBeenCalledTimes(1);
        expect(setSelectedLessonMock).toHaveBeenCalledWith(lesson);
        expect(navigateToDetailMock).toHaveBeenCalledTimes(1);
    });
});