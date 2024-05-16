import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onPressMock } from '../../../../../jest.setup';

/* Modules */
import { RadioBtn } from '../../../../../src/modules/ui';

const radioLabel = 'Label test';

const user = userEvent.setup();

const renderComponent = (isSelected = false) => render(
    <RadioBtn
        label={ radioLabel }
        onPress={ onPressMock }
        isSelected={ isSelected }
    />
);

describe('Test in <RadioBtn /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render label', () => {
        renderComponent();

        /* Get label of radio button */
        const label = screen.getByTestId('radio-btn-text');

        /* Check if label exists and contain text pass by props */
        expect(label).toBeTruthy();
        expect(label.props.children).toBe(radioLabel);
    });

    it('should call onPress when pressed', async () => {
        renderComponent();

        /* Get label of radio button */
        const pressable = screen.getByTestId('radio-btn-pressable');
        await user.press(pressable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});