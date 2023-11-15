import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import dayjs from 'dayjs';

/* Screens */
import { PrecursorHome } from '../../../src/screens/preaching';

/* Features */
import { INIT_PREACHING } from '../../../src/features';

/* Hooks */
import { useAuth, useCourses, usePreaching, useTheme } from '../../../src/hooks';

/* Setup */
import { navigateMock } from '../../../jest.setup';

/* Theme */
import { darkColors } from '../../../src/theme';

import { coursesStateMock, loadPreachingsMock, preachingsStateMock, setSelectedPreachingMock, testUser } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/usePreaching.ts');
jest.mock('../../../src/hooks/useTheme.ts');

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

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors, selectedTheme: 'dark' },
        BUTTON_TRANSLUCENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(<PrecursorHome />);
    });

    it('should to match snapshot', async () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective title with month and year', () => {
        const month = dayjs(preachingsStateMock.selectedDate).format('MMMM').toUpperCase();
        const year = dayjs(preachingsStateMock.selectedDate).get('year');

        /* Get title */
        const title = screen.getByTestId('title-text');

        /* Check if title exists and contain respective values */
        expect(title).toBeTruthy();
        expect(title.props.children).toBe(`INFORME DE ${ month } ${ year }`);
    });

    it('should render PreachingTable when isPreachingsLoading is false and preachings are more of 0', () => {

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

        render(<PrecursorHome />);

        /* Get loader and check if exists */
        const loader = screen.getByTestId('home-loading');
        expect(loader).toBeTruthy();
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

        render(<PrecursorHome />);

        /* Get text of empty message */
        const text = screen.getByTestId('info-text-text');

        /* Check if text exists and contain respective value */
        expect(text).toBeTruthy();
        expect(text.props.children).toBe('No has agregado ningún día de predicación para el informe de este mes.');
    });

    it('should call setSelectedPreaching and navigate when add button is pressed', () => {

        /* Get touchable */
        const touchable = screen.getAllByTestId('fab-touchable')[1];
        fireEvent.press(touchable);

        /* Check if setSelectedPreaching is called one time with respective value */
        expect(setSelectedPreachingMock).toHaveBeenCalledTimes(1);
        expect(setSelectedPreachingMock).toHaveBeenCalledWith({
            ...INIT_PREACHING,
            day: expect.any(String),
            initHour: expect.any(String),
            finalHour: expect.any(String)
        });

        /* Check if navigate is called one time with respective value */
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('AddOrEditPreachingScreen');
    });
});