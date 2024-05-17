import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation } from '../../../../../jest.setup';

/* Mocks */
import { coursesStateMock, loadPreachingsMock, preachingsStateMock, setSelectedPreachingMock, testUser } from '../../../../mocks';

/* Modules */
import { useAuth } from '../../../../../src/modules/auth';
import { useCourses } from '../../../../../src/modules/courses';
import { INIT_PREACHING, PrecursorHome, usePreaching } from '../../../../../src/modules/preaching';

/* Utils */
import { date } from '../../../../../src/utils';

/* Mock hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');
jest.mock('../../../../../src/modules/preaching/hooks/usePreaching.ts');

const user = userEvent.setup();
const renderScreen = () => render(<PrecursorHome />);

describe('Test in <PrecursorHome /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { user: testUser },
    });

    (useCourses as jest.Mock).mockReturnValue({
        state: coursesStateMock,
    });

    (usePreaching as jest.Mock).mockReturnValue({
        state: preachingsStateMock,
        setSelectedPreaching: setSelectedPreachingMock,
        loadPreachings: loadPreachingsMock
    });

    it('should to match snapshot', async () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective title with month and year', () => {
        renderScreen();

        const month = date.format(preachingsStateMock.selectedDate, 'MMMM').toUpperCase();
        const year = date.getYearOfDate(preachingsStateMock.selectedDate);

        /* Get title */
        const title = screen.getByTestId('title-text');

        /* Check if title exists and contain respective values */
        expect(title).toBeTruthy();
        expect(title).toHaveTextContent(`INFORME DE ${ month } ${ year }`);
    });

    it('should render PreachingTable when isPreachingsLoading is false and preachings are more of 0', () => {
        renderScreen();

        /* Get table and check if exists */
        const table = screen.getByTestId('preaching-table');
        expect(table).toBeTruthy();
    });

    it('should render loader when isPreachingsLoading is true', () => {

        /* Mock data of usePreaching */
        (usePreaching as jest.Mock).mockReturnValue({
            state: {
                ...preachingsStateMock,
                isPreachingsLoading: true
            },
            setSelectedPreaching: setSelectedPreachingMock,
            loadPreachings: loadPreachingsMock
        });

        renderScreen();

        /* Get loader and check if exists */
        const loader = screen.getByTestId('home-loading');
        expect(loader).toBeOnTheScreen();
    });

    it('should render empty message when isPreachingsLoading is false and preachings is equal to 0', () => {

        /* Mock data of usePreaching */
        (usePreaching as jest.Mock).mockReturnValue({
            state: {
                ...preachingsStateMock,
                isPreachingsLoading: false,
                preachings: []
            },
            setSelectedPreaching: setSelectedPreachingMock,
            loadPreachings: loadPreachingsMock
        });

        renderScreen();

        /* Get text of empty message */
        const text = screen.getByTestId('info-text-text');

        /* Check if text exists and contain respective value */
        expect(text).toBeOnTheScreen();
        expect(text).toHaveTextContent('No has agregado ningún día de predicación para el informe de este mes.');
    });

    it('should call setSelectedPreaching and navigate when add button is pressed', async () => {
        renderScreen();

        /* Get touchable */
        const pressable = screen.getAllByTestId('fab-touchable')[1];
        await user.press(pressable);

        /* Check if setSelectedPreaching is called one time with respective value */
        expect(setSelectedPreachingMock).toHaveBeenCalledTimes(1);
        expect(setSelectedPreachingMock).toHaveBeenCalledWith({
            ...INIT_PREACHING,
            day: expect.any(String),
            initHour: expect.any(String),
            finalHour: expect.any(String)
        });

        /* Check if navigate is called one time with respective value */
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('AddOrEditPreachingScreen');
    });
});