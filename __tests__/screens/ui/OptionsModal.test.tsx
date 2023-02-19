import React from 'react';
import hexToRgba from 'hex-to-rgba';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { OptionsModal } from '../../../src/screens/ui';

import { useTheme } from '../../../src/hooks';

import { ItemOption } from '../../../src/interfaces/ui';

import { darkColors } from '../../../src/theme';

const modalTitle = 'Select an option';

const itemsOptions: ItemOption[] = [
    { label: 'Test option 1', value: 'test-option-1' },
    { label: 'Test option 2', value: 'test-option-2' },
    { label: 'Test option 3', value: 'test-option-3' },
    { label: 'Test option 4', value: 'test-option-4' }
];

const onCancelMock = jest.fn();
const onChangeValueMock = jest.fn();

jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <OptionsModal /> screen', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSLUCENT_COLOR: hexToRgba('#C0A7E1', 0.50)
    });

    beforeEach(() => {
        render(
            <OptionsModal
                isOpen
                items={ itemsOptions }
                onCancel={ onCancelMock }
                onChangeValue={ onChangeValueMock }
                title={ modalTitle }
                value="test-option-1"
            />
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render modal title', () => {
        const title = screen.getByTestId('info-text-text');

        expect(title).toBeTruthy();
        expect(title.props.children).toBe(modalTitle);
    });

    it('should render all options of items', () => {
        const options = screen.getAllByTestId('radio-btn-container');

        expect(options).toHaveLength(itemsOptions.length);
    });

    it('should call onChangeValue with respective value when any option is pressed', () => {
        const options = screen.getAllByTestId('radio-btn-text');
        fireEvent.press(options[1]);

        expect(onChangeValueMock).toHaveBeenCalledTimes(1);
        expect(onChangeValueMock).toHaveBeenCalledWith(itemsOptions[1].value);
    });

    it('should call onCancel when cancel button is pressed', () => {
        const touchable = screen.getByTestId('button-touchable');
        fireEvent.press(touchable);

        expect(onCancelMock).toHaveBeenCalledTimes(1);
    });
});