import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { useStatusSpy } from '@test-setup';

/* Mocks */
import { clearStatusMock, permissionsStatusStateMock, successStateMock } from '@mocks';

/* Modules */
import { StatusModal } from '@shared';

const user = userEvent.setup();
const renderScreen = () => render(<StatusModal />);

describe('Test in <StatusModal /> screen', () => {
    useStatusSpy.mockImplementation(() => ({
        state: successStateMock,
        clearStatus: clearStatusMock
    }) as any);

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call clearStatus when confirm button is pressed', async () => {
        renderScreen();

        /* Get confirm pressable */
        const pressable = screen.getAllByTestId('button-pressable')[0];
        await user.press(pressable);

        /* Check if clearStatus is called */
        expect(clearStatusMock).toHaveBeenCalled();
    });

    it('should render two buttons when espesific message', () => {
        /* Mock data of useStatus */
        useStatusSpy.mockImplementation(() => ({
            state: permissionsStatusStateMock,
            clearStatus: clearStatusMock
        }) as any);

        renderScreen();

        /* Get two pressables */
        const buttons = screen.getAllByTestId('button-pressable');
        expect(buttons).toHaveLength(2);
    });
});