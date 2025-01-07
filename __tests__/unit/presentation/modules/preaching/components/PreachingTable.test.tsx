import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation } from '@test-setup';

/* Mocks */
import { preachingsStateMock, setSelectedPreachingMock, usePreachingSpy, useThemeSpy } from '@mocks';

/* Modules */
import { PreachingTable } from '@preaching';

const user = userEvent.setup();
const renderComponent = () => render(<PreachingTable />);

describe('Test in <PreachingTable /> component', () => {
    usePreachingSpy.mockImplementation(() => ({
        state: preachingsStateMock,
        setSelectedPreaching: setSelectedPreachingMock
    }) as any);

    useThemeSpy.mockImplementation(() => ({
        state: { theme: 'dark', selectedTheme: 'dark' }
    }) as any);

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

    it('should call setSelectedPreaching and navigate when row is pressed', async () => {
        renderComponent();

        /* Get one row of table */
        const row = screen.getAllByTestId('preaching-table-row')[0];
        await user.press(row);

        /**
         * Check if setSelectedPreaching and navigate is called one
         * time with respective args
         */
        expect(setSelectedPreachingMock).toHaveBeenCalledTimes(1);
        expect(setSelectedPreachingMock).toHaveBeenCalledWith(preachingsStateMock.preachings[0]);
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('AddOrEditPreachingScreen');
    });
});