import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onPressMock } from '../../../../../jest.setup';

/* Components */
import { Checkbox } from '../../../../../src/modules/ui';

const user = userEvent.setup();

const renderComponent = () => render(
    <Checkbox
        label={ checkboxLabel }
        onPress={ onPressMock }
        status="checked"
    />
);

const checkboxLabel = 'Label test';

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
        const label = screen.getByTestId('checkbox-text');

        /* Check if label exists and contain text pass by props */
        expect(label).toBeTruthy();
        expect(label.props.children).toBe(checkboxLabel);
    });

    it('should call onPress when pressed', async () => {
        renderComponent();

        /* Get checkbox element */
        const checkbox = screen.getByTestId('checkbox-touchable');
        await user.press(checkbox);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});