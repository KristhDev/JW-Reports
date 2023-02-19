import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';

import { DeleteModal } from '../../../src/screens/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const modalTitle = 'Are you sure you want to delete this resource?';
const onCofirmMock = jest.fn();
const onCloseMock = jest.fn();

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
        const title = screen.getByTestId('delete-modal-title');

        expect(title).toBeTruthy();
        expect(title.props.children).toBe(modalTitle)
    });

    it('should call onConfirm when the confirm button is pressed', () => {
        const touchable = screen.getAllByTestId('button-touchable')[1];
        fireEvent.press(touchable);

        expect(onCofirmMock).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when the cancel button is pressed', () => {
        const touchable = screen.getAllByTestId('button-touchable')[0];
        fireEvent.press(touchable);

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

        const loader = screen.getByTestId('delete-modal-loading');

        expect(loader).toBeTruthy();
    });
});