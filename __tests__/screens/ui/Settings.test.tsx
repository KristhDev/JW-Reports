import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';
import dayjs from 'dayjs';

/* Screens */
import { Settings } from '../../../src/screens/ui';

/* Hooks */
import { useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { navigateMock } from '../../../jest.setup';

/* Mocks */
import { setStatusMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Settings /> screen', () => {
    (useStatus as jest.Mock).mockReturnValue({
        setStatus: setStatusMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors, theme: 'dark' },
        BUTTON_TRANSLUCENT_COLOR: hexToRgba(darkColors.button, 0.50),
        setTheme: jest.fn()
    });

    beforeEach(() => {
        render(<Settings />);
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call navigate of useNavigation when press buttons sections in MI CUENTA section', () => {

        /* Get touchables */
        const touchables = screen.getAllByTestId('section-btn-touchable');

        fireEvent.press(touchables[0]);

        /* Check is navigate is called one times with respective value */
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('ProfileScreen');

        fireEvent.press(touchables[1]);

        /* Check is navigate is called one times with respective value */
        expect(navigateMock).toHaveBeenCalledTimes(2);
        expect(navigateMock).toHaveBeenCalledWith('CredentialsScreen');
    });

    it('should call setStatus with respective values', () => {

        /* Get touchables */
        const touchables = screen.getAllByTestId('section-btn-touchable');

        fireEvent.press(touchables[6]);

        /* Check if setStatus is called one time with respective value */
        expect(setStatusMock).toHaveBeenCalledTimes(1);
        expect(setStatusMock).toHaveBeenCalledWith({
            code: 200,
            msg: 'Para más información o dejar sus comentarios acerca de la aplicación, por favor escriba al siguiente correo: kristhdev@gmail.com',
        });
    });

    it('should render respective text in copyright', () => {

        /* Get copyright text */
        const copyrightText = screen.getByTestId('settings-copyright-text');

        /* Check if copyright text exists and contain respective value */
        expect(copyrightText).toBeTruthy();
        expect(copyrightText.props.children.join('')).toBe(`Copyright © ${ dayjs().year() }`);
    });
});