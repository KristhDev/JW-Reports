import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Modules */
import { TableCell } from '@ui';

const text = 'Cell';

const renderComponent = () => render(<TableCell text={ text } />);

describe('Test in <TableCell /> component', () => {
    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render text in cell', () => {
        renderComponent();

        /* Get text of cell */
        const cellText = screen.getByTestId('table-cell-text');

        /* Check if text exists and contain respective value */
        expect(cellText).toBeOnTheScreen();
        expect(cellText).toHaveTextContent(text);
    });
});