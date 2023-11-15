import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Features */
import { INIT_LESSON } from '../../../src/features';

/* Screens */
import { Lessons } from '../../../src/screens/courses';

/* Hooks */
import { useCourses, useNetwork, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { lessonsStateMock, setSelectedLessonMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useNetwork.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Lessons /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: lessonsStateMock,
        deleteLesson: jest.fn(),
        loadLessons: jest.fn(),
        removeLessons: jest.fn(),
        setLessonsPagination: jest.fn(),
        setSelectedLesson: setSelectedLessonMock,
        finishOrStartLesson: jest.fn(),
    });

    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(
            <MenuProvider>
                <Lessons />
            </MenuProvider>
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call setSelectedLesson when add button is pressed', () => {

        /* Get fabs and add button */
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];

        fireEvent.press(addBtn);

        /* Check if setSelectedLesson is called one time with respective values */
        expect(setSelectedLessonMock).toHaveBeenCalledTimes(1);
        expect(setSelectedLessonMock).toHaveBeenCalledWith({
            ...INIT_LESSON,
            nextLesson: expect.any(String),
        })
    });
});