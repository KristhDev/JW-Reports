import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Components */
import { InfoText } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

const textInfo = 'Info text test';

describe('Test in <InfoText /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(<InfoText text={ textInfo } />);
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {

        /* Get text */
        const text = screen.getByTestId('info-text-text');

        /* Check if text exists and containt text pass by props */
        expect(text).toBeTruthy();
        expect(text.props.children).toBe(textInfo);
    });
});