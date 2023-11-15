import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

/* Components */
import { PreachingTable } from '../../../src/components/preaching';

/* Hooks */
import { usePreaching, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { navigateMock } from '../../../jest.setup';

/* Mocks */
import { preachingsStateMock, setSelectedPreachingMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/usePreaching.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <PreachingTable /> component', () => {
    (usePreaching as jest.Mock).mockReturnValue({
        state: preachingsStateMock,
        setSelectedPreaching: setSelectedPreachingMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors, selectedTheme: 'dark' },
    });

    beforeEach(() => {
        render(<PreachingTable />);
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should table rows must match total preaching days', () => {

        /* Get rows of table */
        const rows = screen.getAllByTestId('preaching-table-row');
        expect(rows.length).toBe(preachingsStateMock.preachings.length);
    });

    it('should call setSelectedPreaching and navigate when row is pressed', () => {

        /* Get one row of table */
        const row = screen.getAllByTestId('preaching-table-row')[0];
        fireEvent.press(row);

        /**
         * Check if setSelectedPreaching and navigate is called one
         * time with respective args
         */
        expect(setSelectedPreachingMock).toHaveBeenCalledTimes(1);
        expect(setSelectedPreachingMock).toHaveBeenCalledWith(preachingsStateMock.preachings[0]);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('AddOrEditPreachingScreen');
    });
});