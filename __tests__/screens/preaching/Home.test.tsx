import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import dayjs from 'dayjs';

import { Home } from '../../../src/screens/preaching';

import { INIT_PREACHING } from '../../../src/features/preaching';
import { coursesState } from '../../features/courses';
import { preachingsState } from '../../features/preaching';

import { useAuth, useCourses, usePreaching, useTheme } from '../../../src/hooks';

import { User } from '../../../src/interfaces/auth';

import { navigateMock } from '../../../jest.setup';

import { darkColors } from '../../../src/theme';

const testUser: User = {
    id: '05ef0d0c-0f7a-4512-b705-6da279d88503',
    name: 'Celestino',
    surname: 'Wilderman',
    email: 'Ernestine_Doyle@yahoo.com',
    precursor: 'ninguno',
    createdAt: '2021-03-10T12:00:00.000Z',
    updatedAt: '2021-03-10T12:00:00.000Z',
}

const setSelectedPreachingMock = jest.fn();
const loadPreachingsMock = jest.fn();

jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/usePreaching.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Home /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { user: testUser },
    });

    (useCourses as jest.Mock).mockReturnValue({
        state: coursesState,
    });

    (usePreaching as jest.Mock).mockReturnValue({
        state: preachingsState,
        setSelectedPreaching: setSelectedPreachingMock,
        loadPreachings: loadPreachingsMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors, selectedTheme: 'dark' },
        BUTTON_TRANSLUCENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(<Home />);
    });

    it('should to match snapshot', async () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective title with month and year', () => {
        const month = dayjs(preachingsState.selectedDate).format('MMMM').toUpperCase();
        const year = dayjs(preachingsState.selectedDate).get('year');

        const title = screen.getByTestId('title-text');

        expect(title).toBeTruthy();
        expect(title.props.children).toBe(`INFORME DE ${ month } ${ year }`);
    });

    it('should render PreachingTable when isPreachingsLoading is false and preachings are more of 0', () => {
        const table = screen.getByTestId('preaching-table');
        expect(table).toBeTruthy();
    });

    it('should render loader when isPreachingsLoading is true', () => {
        (usePreaching as jest.Mock).mockReturnValue({
            state: {
                ...preachingsState,
                isPreachingsLoading: true
            },
            setSelectedPreaching: setSelectedPreachingMock,
            loadPreachings: loadPreachingsMock
        });

        render(<Home />);

        const loader = screen.getByTestId('home-loading');

        expect(loader).toBeTruthy();
    });

    it('should render empty message when isPreachingsLoading is false and preachings is equal to 0', () => {
        (usePreaching as jest.Mock).mockReturnValue({
            state: {
                ...preachingsState,
                isPreachingsLoading: false,
                preachings: []
            },
            setSelectedPreaching: setSelectedPreachingMock,
            loadPreachings: loadPreachingsMock
        });

        render(<Home />);

        const text = screen.getByTestId('info-text-text');

        expect(text).toBeTruthy();
        expect(text.props.children).toBe('No haz agregado ningún día de predicación para el informe de este mes.');
    });

    it('should call setSelectedPreaching and navigate when add button is pressed', () => {
        const touchable = screen.getAllByTestId('fab-touchable')[1];
        fireEvent.press(touchable);

        expect(setSelectedPreachingMock).toHaveBeenCalledTimes(1);
        expect(setSelectedPreachingMock).toHaveBeenCalledWith({
            ...INIT_PREACHING,
            day: expect.any(String),
            init_hour: expect.any(String),
            final_hour: expect.any(String)
        });

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('AddOrEditPreachingScreen');
    });
});