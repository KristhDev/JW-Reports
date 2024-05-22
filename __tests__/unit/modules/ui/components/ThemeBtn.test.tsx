import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { useThemeSpy } from '../../../../../jest.setup';

/* Mocks */
import { setThemeMock } from '../../../../mocks';

/* Modules */
import { ThemeBtn } from '../../../../../src/modules/ui';

const user = userEvent.setup();
const renderComponent = () => render(<ThemeBtn />);

describe('Test in <ThemeBtn /> component', () => {
    useThemeSpy.mockImplementation(() => ({
        state: { theme: 'dark', selectedTheme: 'dark' },
        setTheme: setThemeMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call setTheme with light argument when pressed', async () => {
        renderComponent();

        /* Get pressable */
        const touchable = screen.getByTestId('fab-pressable');
        await user.press(touchable);

        /* Check if setTheme is called one time with respective value */
        expect(setThemeMock).toHaveBeenCalledTimes(1);
        expect(setThemeMock).toHaveBeenCalledWith('light');
    });

    it('should change icon when change selectedTheme', async () => {
        useThemeSpy.mockImplementation(() => ({
            state: { theme: 'light', selectedTheme: 'light' },
            setTheme: setThemeMock
        }));

        /* Mock data of useTheme */
        renderComponent();

        /* Get touchable and check if is icon sunny-outline */
        const touchable = screen.getByTestId('fab-pressable');
        const icon = await touchable.findByProps({ name: 'moon-outline' });

        expect(icon.props).toHaveProperty('name', 'moon-outline');
    });
});