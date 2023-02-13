import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { ThemeBtn } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors, lightColors } from '../../../src/theme';

const setThemeMock = jest.fn();

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
        const touchable = screen.getByTestId('fab-touchable');
        fireEvent.press(touchable);

        expect(setThemeMock).toHaveBeenCalledTimes(1);
        expect(setThemeMock).toHaveBeenCalledWith('light');
    });

    it('should change icon when change selectedTheme', () => {
        (useTheme as jest.Mock).mockReturnValue({
            state: { colors: lightColors, selectedTheme: 'light' },
            setTheme: setThemeMock
        });

        const touchable = screen.getByTestId('fab-touchable');
        expect(touchable.props.children[0].props.name).toBe('sunny-outline');
    });
});