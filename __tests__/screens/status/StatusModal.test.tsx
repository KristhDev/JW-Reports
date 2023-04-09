import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';

/* Screens */
import { StatusModal } from '../../../src/screens/status';

/* Hooks */
import { useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const clearStatusMock = jest.fn();

/* Mock hooks */
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <StatusModal /> screen', () => {
    (useStatus as jest.Mock).mockReturnValue({
        state: { msg: 'Test message of status modal.' },
        clearStatus: clearStatusMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: hexToRgba(darkColors.button, 0.50)
    });

    beforeEach(() => {
        render(<StatusModal />);
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call clearStatus when confirm button is pressed', () => {

        /* Get confirm touchable */
        const touchable = screen.getAllByTestId('button-touchable')[0];
        fireEvent.press(touchable);

        /* Check if clearStatus is called */
        expect(clearStatusMock).toHaveBeenCalled();
    });

    it('should render two buttons when espesific message', () => {

        /* Mock data of useStatus */
        (useStatus as jest.Mock).mockReturnValue({
            state: { msg: 'Para realizar está acción necesitas permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación.' },
            clearStatus: clearStatusMock
        });

        render(<StatusModal />);

        /* Get two touchables */
        const buttons = screen.getAllByTestId('button-touchable');
        expect(buttons).toHaveLength(2);
    });
});