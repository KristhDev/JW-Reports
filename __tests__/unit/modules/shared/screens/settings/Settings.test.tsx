import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation } from '../../../../../../jest.setup';

/* Mocks */
import { setStatusMock } from '../../../../../mocks';

/* Modules */
import { Settings, useStatus } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderScreen = () => render(<Settings />);

describe('Test in <Settings /> screen', () => {
    (useStatus as jest.Mock).mockReturnValue({
        setStatus: setStatusMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call navigate of useNavigation when press buttons sections in MI CUENTA section', async () => {
        renderScreen();

        /* Get touchables */
        const pressables = screen.getAllByTestId('section-btn-pressable');

        await user.press(pressables[0]);

        /* Check is navigate is called one times with respective value */
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('ProfileScreen');

        await user.press(pressables[1]);

        /* Check is navigate is called one times with respective value */
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(2);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('CredentialsScreen');
    });

    it('should call setStatus with respective values', async () => {
        renderScreen();

        /* Get touchables */
        const pressables = screen.getAllByTestId('section-btn-pressable');
        await user.press(pressables[6]);

        /* Check if setStatus is called one time with respective value */
        expect(setStatusMock).toHaveBeenCalledTimes(1);
        expect(setStatusMock).toHaveBeenCalledWith({
            code: 200,
            msg: 'Para más información o dejar sus comentarios acerca de la aplicación, por favor escriba al siguiente correo: kristhdev@gmail.com',
        });
    });

    it('should render respective text in copyright', () => {
        renderScreen();

        /* Get copyright text */
        const copyrightText = screen.getByTestId('settings-copyright-text');

        /* Check if copyright text exists and contain respective value */
        expect(copyrightText).toBeOnTheScreen();
        expect(copyrightText).toHaveTextContent(`Copyright © ${ new Date().getFullYear() }`);
    });
});