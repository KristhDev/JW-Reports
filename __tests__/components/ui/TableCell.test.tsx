import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { TableCell } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const text = 'Cell';

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
        const cellText = screen.getByTestId('table-cell-text');

        expect(cellText).toBeTruthy();
        expect(cellText.props.children).toBe(text);
    });
});