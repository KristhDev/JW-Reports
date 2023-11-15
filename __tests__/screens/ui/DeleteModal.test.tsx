import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';

/* Screens */
import { DeleteModal } from '../../../src/screens/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { onCloseMock, onCofirmMock } from '../../../jest.setup';

const modalTitle = 'Are you sure you want to delete this resource?';

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <DeleteModal /> screen', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSLUCENT_COLOR: hexToRgba('#C0A7E1', 0.50)
    });

    beforeEach(() => {
        render(
            <DeleteModal
                isLoading={ false }
                isOpen
                onClose={ onCloseMock }
                onConfirm={ onCofirmMock }
                text={ modalTitle }
            />
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render the modal title', () => {

        /* Get title */
        const title = screen.queryByTestId('delete-modal-title');

        /* Check if title exists and containt value pass by props */
        expect(title).toBeTruthy();
        expect(title!.props.children).toBe(modalTitle)
    });

    it('should call onConfirm when the confirm button is pressed', () => {

        /* Get confirm touchable */
        const touchable = screen.getAllByTestId('button-touchable')[1];
        fireEvent.press(touchable);

        /* Check if onCofirm is called one time */
        expect(onCofirmMock).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when the cancel button is pressed', () => {

        /* Get cancel touchable */
        const touchable = screen.getAllByTestId('button-touchable')[0];
        fireEvent.press(touchable);

        /* Check if onClose is called one time */
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should render loader when isLoading is true', () => {
        render(
            <DeleteModal
                isLoading
                isOpen
                onClose={ onCloseMock }
                onConfirm={ onCofirmMock }
                text={ modalTitle }
            />
        );

        /* Get loader and check if exists */
        const loader = screen.queryByTestId('delete-modal-loading');
        expect(loader).toBeTruthy();
    });
});