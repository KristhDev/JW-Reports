import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

/* Components */
import { ThemeBtn } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors, lightColors } from '../../../src/theme';

const setThemeMock = jest.fn();

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <ThemeBtn /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors, selectedTheme: 'dark' },
        setTheme: setThemeMock
    });

    beforeEach(() => {
        render(<ThemeBtn />);

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call setTheme with light argument when pressed', () => {

        /* Get touchable */
        const touchable = screen.getByTestId('fab-touchable');
        fireEvent.press(touchable);

        /* Check if setTheme is called one time with respective value */
        expect(setThemeMock).toHaveBeenCalledTimes(1);
        expect(setThemeMock).toHaveBeenCalledWith('light');
    });

    it('should change icon when change selectedTheme', () => {

        /* Mock data of useTheme */
        (useTheme as jest.Mock).mockReturnValue({
            state: { colors: lightColors, selectedTheme: 'light' },
            setTheme: setThemeMock
        });

        /* Get touchable and check if is icon sunny-outline */
        const touchable = screen.getByTestId('fab-touchable');
        expect(touchable.props.children[0].props.name).toBe('sunny-outline');
    });
});