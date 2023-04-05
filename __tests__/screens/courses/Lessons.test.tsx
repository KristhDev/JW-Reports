import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

import { INIT_LESSON } from '../../../src/features/courses';
import { lessonsState } from '../../features/courses';

import { Lessons } from '../../../src/screens/courses';

import { useCourses, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const setSelectedLessonMock = jest.fn();

jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Lessons /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: lessonsState,
        deleteLesson: jest.fn(),
        loadLessons: jest.fn(),
        removeLessons: jest.fn(),
        setLessonsPagination: jest.fn(),
        setSelectedLesson: setSelectedLessonMock,
        finishOrStartLesson: jest.fn(),
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
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];

        fireEvent.press(addBtn);

        expect(setSelectedLessonMock).toHaveBeenCalledTimes(1);
        expect(setSelectedLessonMock).toHaveBeenCalledWith({
            ...INIT_LESSON,
            next_lesson: expect.any(String),
        })
    });
});