import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Components */
import { ListFooterComponent } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mock hooks */
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

        /* Get loader and check if exists */
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

        /* Check if content of component is null */
        expect(screen.toJSON()).toBeNull();
    });
});