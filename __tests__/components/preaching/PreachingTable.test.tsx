import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { PreachingTable } from '../../../src/components/preaching';

import { usePreaching, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

import { preachingsState } from '../../features/preaching';

import { navigateMock } from '../../../jest.setup';

const setSelectedPreachingMock = jest.fn();

jest.mock('../../../src/hooks/usePreaching.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <PreachingTable /> component', () => {
    (usePreaching as jest.Mock).mockReturnValue({
        state: preachingsState,
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
        const rows = screen.getAllByTestId('preaching-table-row');
        expect(rows.length).toBe(preachingsState.preachings.length);
    });

    it('should call setSelectedPreaching and navigate when row is pressed', () => {
        const row = screen.getAllByTestId('preaching-table-row')[0];
        fireEvent.press(row);

        expect(setSelectedPreachingMock).toHaveBeenCalledTimes(1);
        expect(setSelectedPreachingMock).toHaveBeenCalledWith(preachingsState.preachings[0]);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('AddOrEditPreachingScreen');
    });
});