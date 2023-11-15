import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';

/* Screens */
import { ThemeModal } from '../../../src/theme';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Utils */
import { THEME_OPTIONS } from '../../../src/utils';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { onCloseMock } from '../../../jest.setup';

/* Mocks */
import { setThemeMock } from '../../mocks';

/* Mock hooks */
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

        /* Get options radio buttons */
        const options = screen.getAllByTestId('radio-btn-text');
        fireEvent.press(options[2]);

        /* Check if setTheme is called one time with respective value */
        expect(setThemeMock).toHaveBeenCalledTimes(1);
        expect(setThemeMock).toHaveBeenCalledWith(THEME_OPTIONS[2].value);
    });
});