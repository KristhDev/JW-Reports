import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

/* Setup */
import { useNavigationMock } from '../../../../../jest.setup';

/* Mocks */
import { preachingsStateMock, setSelectedPreachingMock } from '../../../../mocks';

/* Modules */
import { PreachingTable, usePreaching } from '../../../../../src/modules/preaching';

/* Mock hooks */
jest.mock('../../../../../src/modules/preaching/hooks/usePreaching.ts');

const renderComponent = () => render(<PreachingTable />);

describe('Test in <PreachingTable /> component', () => {
    (usePreaching as jest.Mock).mockReturnValue({
        state: preachingsStateMock,
        setSelectedPreaching: setSelectedPreachingMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should table rows must match total preaching days', () => {
        renderComponent();

        /* Get rows of table */
        const rows = screen.getAllByTestId('preaching-table-row');
        expect(rows.length).toBe(preachingsStateMock.preachings.length);
    });

    it('should call setSelectedPreaching and navigate when row is pressed', () => {
        renderComponent();

        /* Get one row of table */
        const row = screen.getAllByTestId('preaching-table-row')[0];
        fireEvent.press(row);

        /**
         * Check if setSelectedPreaching and navigate is called one
         * time with respective args
         */
        expect(setSelectedPreachingMock).toHaveBeenCalledTimes(1);
        expect(setSelectedPreachingMock).toHaveBeenCalledWith(preachingsStateMock.preachings[0]);
        expect(useNavigationMock.navigate).toHaveBeenCalledTimes(1);
        expect(useNavigationMock.navigate).toHaveBeenCalledWith('AddOrEditPreachingScreen');
    });
});