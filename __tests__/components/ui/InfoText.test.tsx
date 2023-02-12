import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { InfoText } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

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
        const text = screen.getByTestId('info-text-text');

        expect(text).toBeTruthy();
        expect(text.props.children).toBe(textInfo);
    });
});