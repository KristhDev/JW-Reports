import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { ListFooterComponent } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <ListFooterComponent /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(
            <ListFooterComponent
                showLoader={ true }
                marginTopPlus={ false }
            />
        );
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render loader', () => {
        const loader = screen.getByTestId('loader');

        expect(loader).toBeTruthy();
    });

    it('should not render loader', () => {
        render(
            <ListFooterComponent
                showLoader={ false }
                marginTopPlus={ true }
            />
        );

        expect(screen.toJSON()).toBeNull();
    });
});