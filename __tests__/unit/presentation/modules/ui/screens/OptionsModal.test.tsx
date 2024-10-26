import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Mocks */
import { onCancelMock, onChangeValueMock } from '@mocks';

/* Modules */
import { ItemOption, OptionsModal } from '@ui';

const modalTitle = 'Select an option';

const itemsOptions: ItemOption[] = [
    { label: 'Test option 1', value: 'test-option-1' },
    { label: 'Test option 2', value: 'test-option-2' },
    { label: 'Test option 3', value: 'test-option-3' },
    { label: 'Test option 4', value: 'test-option-4' }
];

const user = userEvent.setup();

const renderComponent = () => render(
    <OptionsModal
        isOpen
        items={ itemsOptions }
        onCancel={ onCancelMock }
        onChangeValue={ onChangeValueMock }
        title={ modalTitle }
        value="test-option-1"
    />
);

describe('Test in <OptionsModal /> screen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render modal title', () => {
        renderComponent();

        /* Get title */
        const title = screen.getByTestId('info-text-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title).toHaveTextContent(modalTitle);
    });

    it('should render all options of items', () => {
        renderComponent();

        /* Get optionsm and check that length is equal to length of itemOptions */
        const options = screen.getAllByTestId('radio-btn-container');
        expect(options).toHaveLength(itemsOptions.length);
    });

    it('should call onChangeValue with respective value when any option is pressed', async () => {
        renderComponent();

        /* Get options */
        const options = screen.getAllByTestId('radio-btn-pressable');
        await user.press(options[1]);

        /* Check if onChangeValue was called one time with respective value */
        expect(onChangeValueMock).toHaveBeenCalledTimes(1);
        expect(onChangeValueMock).toHaveBeenCalledWith(itemsOptions[1].value);
    });

    it('should call onCancel when cancel button is pressed', async () => {
        renderComponent();

        /* Get cancel pressable */
        const pressable = screen.getByTestId('button-pressable');
        await user.press(pressable);

        /* Check if onCancel was called one time */
        expect(onCancelMock).toHaveBeenCalledTimes(1);
    });
});