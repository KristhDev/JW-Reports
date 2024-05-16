import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Mocks */
import { setThemeMock } from '../../../../mocks';

/* Modules */
import { ThemeBtn } from '../../../../../src/modules/ui';
import { useTheme } from '../../../../../src/modules/theme';

jest.mock('../../../../../src/modules/theme/hooks/useTheme.ts');
const useThemeMock = jest.mocked(useTheme, { shallow: true });

const user = userEvent.setup();
const renderComponent = () => render(<ThemeBtn />);

describe('Test in <ThemeBtn /> component', () => {
    useThemeMock.mockReturnValue({
        setTheme: setThemeMock,
        state: { theme: 'dark', selectedTheme: 'dark' }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call setTheme with light argument when pressed', async () => {
        renderComponent();

        /* Get touchable */
        const touchable = screen.getByTestId('fab-touchable');
        await user.press(touchable);

        /* Check if setTheme is called one time with respective value */
        expect(setThemeMock).toHaveBeenCalledTimes(1);
        expect(setThemeMock).toHaveBeenCalledWith('light');
    });

    it('should change icon when change selectedTheme', () => {
        /* Mock data of useTheme */
        (useTheme as jest.Mock).mockReturnValue({
            state: { theme: 'light' },
            setTheme: setThemeMock
        });

        renderComponent();

        /* Get touchable and check if is icon sunny-outline */
        const touchable = screen.getByTestId('fab-touchable');
        const iconName = touchable.props.children[0].props.children[1].props.name;
        expect(iconName).toBe('sunny-outline');
    });
});