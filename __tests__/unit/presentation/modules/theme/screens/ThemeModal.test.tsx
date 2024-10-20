import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onCloseMock, useThemeSpy } from '@test-setup';

/* Mocks */
import { setThemeMock } from '@mocks';

/* Modules */
import { THEME_OPTIONS, ThemeModal } from '@theme';

const user = userEvent.setup();
const renderScreen = () => render(
    <ThemeModal
        isOpen
        onClose={ onCloseMock }
    />
)

describe('Test in <ThemeModal /> screen', () => {
    useThemeSpy.mockImplementation(() => ({
        state: { theme: 'dark' },
        setTheme: setThemeMock
    }) as any);

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