import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';
import dayjs from 'dayjs';

import { Settings } from '../../../src/screens/ui';

import { useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

import { navigateMock } from '../../../jest.setup';

const setStatusMock = jest.fn();

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
        const touchables = screen.getAllByTestId('section-btn-touchable');

        fireEvent.press(touchables[0]);

        expect(navigateMock).toBeCalledTimes(1);
        expect(navigateMock).toBeCalledWith('ProfileScreen');

        fireEvent.press(touchables[1]);

        expect(navigateMock).toBeCalledTimes(2);
        expect(navigateMock).toBeCalledWith('CredentialsScreen');
    });

    it('should call setStatus with respective values', () => {
        const touchables = screen.getAllByTestId('section-btn-touchable');

        fireEvent.press(touchables[6]);

        expect(setStatusMock).toHaveBeenCalledTimes(1);
        expect(setStatusMock).toHaveBeenCalledWith({
            code: 200,
            msg: 'Para más información o dejar sus comentarios acerca de la aplicación, escriba al correo: kristhdev@gmail.com',
        });
    });

    it('should render respective text in copyright', () => {
        const copyrightText = screen.getByTestId('settings-copyright-text');

        expect(copyrightText).toBeTruthy();
        expect(copyrightText.props.children.join('')).toBe(`Copyright © ${ dayjs().year() }`);
    });
});