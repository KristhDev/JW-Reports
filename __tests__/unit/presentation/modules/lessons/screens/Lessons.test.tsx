import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Mocks */
import {
    courseSelectedStateMock,
    initialUIState,
    lessonsStateMock,
    setSelectedLessonMock,
    useCoursesSpy,
    useLessonsSpy,
    useNetworkSpy,
    useUISpy,
    wifiMock
} from '@mocks';

/* Features */
import { INIT_LESSON } from '@application/features';

/* Modules */
import { Lessons } from '@lessons';

const user = userEvent.setup();
const renderScreen = () => render(
    <MenuProvider>
        <Lessons />
    </MenuProvider>
);

describe('Test in <Lessons /> screen', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: courseSelectedStateMock
    }) as any);

    useLessonsSpy.mockImplementation(() => ({
        state: lessonsStateMock,
        deleteLesson: jest.fn(),
        loadLessons: jest.fn(),
        removeLessons: jest.fn(),
        setLessonsPagination: jest.fn(),
        setSelectedLesson: setSelectedLessonMock,
        finishOrStartLesson: jest.fn(),
    }) as any);

    useNetworkSpy.mockImplementation(() => ({ wifi: wifiMock }) as any);
    useUISpy.mockImplementation(() => ({ state: initialUIState }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call setSelectedLesson when add button is pressed', async () => {
        renderScreen();

        /* Get fabs and add button */
        const fabs = screen.getAllByTestId('fab-pressable');
        const addBtn = fabs[fabs.length - 1];

        await user.press(addBtn);

        /* Check if setSelectedLesson is called one time with respective values */
        expect(setSelectedLessonMock).toHaveBeenCalledTimes(1);
        expect(setSelectedLessonMock).toHaveBeenCalledWith({
            ...INIT_LESSON,
            nextLesson: expect.any(String),
        })
    });
});