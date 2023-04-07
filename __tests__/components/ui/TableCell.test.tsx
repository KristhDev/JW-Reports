import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Components */
import { TableCell } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const text = 'Cell';

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <TableCell /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(<TableCell text={ text } />);
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render text in cell', () => {

        /* Get text of cell */
        const cellText = screen.getByTestId('table-cell-text');

        /* Check if text exists and contain respective value */
        expect(cellText).toBeTruthy();
        expect(cellText.props.children).toBe(text);
    });
});