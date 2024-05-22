import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onCloseMock, onCofirmMock } from '../../../../../jest.setup';

/* Screens */
import { DeleteModal } from '../../../../../src/modules/ui';

const user = userEvent.setup();

const renderScreen = (isLoading = false) => render(
    <DeleteModal
        isLoading={ isLoading }
        isOpen
        onClose={ onCloseMock }
        onConfirm={ onCofirmMock }
        text={ modalTitle }
    />
);

const modalTitle = 'Are you sure you want to delete this resource?';

describe('Test in <DeleteModal /> screen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render the modal title', () => {
        renderScreen();

        /* Get title */
        const title = screen.queryByTestId('delete-modal-title');

        /* Check if title exists and containt value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(modalTitle)
    });

    it('should call onConfirm when the confirm button is pressed', async () => {
        renderScreen();

        /* Get confirm pressable */
        const pressable = screen.getAllByTestId('button-pressable')[1];
        await user.press(pressable);

        /* Check if onCofirm is called one time */
        expect(onCofirmMock).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when the cancel button is pressed', async () => {
        renderScreen();

        /* Get cancel pressable */
        const pressable = screen.getAllByTestId('button-pressable')[0];
        await user.press(pressable);

        /* Check if onClose is called one time */
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should render loader when isLoading is true', () => {
        renderScreen(true);

        /* Get loader and check if exists */
        const loader = screen.queryByTestId('delete-modal-loading');
        expect(loader).toBeOnTheScreen();
    });
});