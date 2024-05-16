import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Mocks */
import { clearStatusMock, permissionsStatusStateMock, successStateMock } from '../../../../../mocks';

/* Modules */
import { StatusModal, useStatus } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderScreen = () => render(<StatusModal />);

describe('Test in <StatusModal /> screen', () => {
    (useStatus as jest.Mock).mockReturnValue({
        state:  successStateMock,
        clearStatus: clearStatusMock
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call clearStatus when confirm button is pressed', async () => {
        renderScreen();

        /* Get confirm touchable */
        const touchable = screen.getAllByTestId('button-touchable')[0];
        await user.press(touchable);

        /* Check if clearStatus is called */
        expect(clearStatusMock).toHaveBeenCalled();
    });

    it('should render two buttons when espesific message', () => {
        /* Mock data of useStatus */
        (useStatus as jest.Mock).mockReturnValue({
            state: permissionsStatusStateMock,
            clearStatus: clearStatusMock
        });

        renderScreen();

        /* Get two touchables */
        const buttons = screen.getAllByTestId('button-touchable');
        expect(buttons).toHaveLength(2);
    });
});