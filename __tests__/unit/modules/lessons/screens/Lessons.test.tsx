import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Mocks */
import { lessonsStateMock, setSelectedLessonMock, wifiMock } from '../../../../mocks';

/* Modules */
import { INIT_LESSON, Lessons, useLessons } from '../../../../../src/modules/lessons';
import { useNetwork } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/lessons/hooks/useLessons.ts');
jest.mock('../../../../../src/modules/shared/hooks/useNetwork.ts');

const user = userEvent.setup();
const renderScreen = () => render(
    <MenuProvider>
        <Lessons />
    </MenuProvider>
);

describe('Test in <Lessons /> screen', () => {
    (useLessons as jest.Mock).mockReturnValue({
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
        const fabs = screen.getAllByTestId('fab-touchable');
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