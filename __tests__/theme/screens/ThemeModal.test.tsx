import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';

import { ThemeModal } from '../../../src/theme';

import { useTheme } from '../../../src/hooks';

import { THEME_OPTIONS } from '../../../src/utils';

import { darkColors } from '../../../src/theme';

const onCloseMock = jest.fn();
const setThemeMock = jest.fn();

jest.mock('../../../src/hooks/useTheme.ts')

describe('Test in <ThemeModal /> screen', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors, theme: 'dark' },
        BUTTON_TRANSLUCENT_COLOR: hexToRgba(darkColors.button, 0.50),
        setTheme: setThemeMock
    });

    beforeEach(() => {
        render(
            <ThemeModal
                isOpen
                onClose={ onCloseMock }
            />
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call setTheme with respective value', () => {
        const options = screen.getAllByTestId('radio-btn-text');
        fireEvent.press(options[2]);

        expect(setThemeMock).toHaveBeenCalledTimes(1);
        expect(setThemeMock).toHaveBeenCalledWith(THEME_OPTIONS[2].value);
    });
});