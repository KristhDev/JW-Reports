import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onCloseMock } from '../../../../../jest.setup';

/* Mocks */
import { setThemeMock } from '../../../../mocks';

/* Modules */
import { THEME_OPTIONS, ThemeModal, useTheme } from '../../../../../src/modules/theme';

/* Mock hooks */
jest.mock('../../../../../src/modules/theme/hooks/useTheme.ts');

const user = userEvent.setup();

const renderScreen = () => render(
    <ThemeModal
        isOpen
        onClose={ onCloseMock }
    />
)

describe('Test in <ThemeModal /> screen', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { theme: 'dark' },
        setTheme: setThemeMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call setTheme with respective value', async () => {
        renderScreen();

        /* Get options radio buttons */
        const options = screen.getAllByTestId('radio-btn-text');
        await user.press(options[2]);

        /* Check if setTheme is called one time with respective value */
        expect(setThemeMock).toHaveBeenCalledTimes(1);
        expect(setThemeMock).toHaveBeenCalledWith(THEME_OPTIONS[2].value);
    });
});