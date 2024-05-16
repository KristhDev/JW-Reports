import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Setup */
import { onPressMock } from '../../../../../jest.setup';

/* Components */
import { Button } from '../../../../../src/modules/ui/components/Button';

const user = userEvent.setup();

const renderComponent = () => render(
    <Button
        icon={
            <Icon
                name="flask-outline"
                size={ 25 }
                testID="button-icon"
            />
        }
        onPress={ onPressMock }
        text={ btnText }
    />
);

const btnText = 'Test text';

describe('Test in <Button /> component', () => {
    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent();

        /* Get elements of component with props */
        const text = screen.getByTestId('button-text');
        const icon = screen.getByTestId('button-icon');

        /* Check if elements exists and contain props */
        expect(text).toBeTruthy();
        expect(text.props.children).toBe(btnText);
        expect(icon).toBeTruthy();
    });

    it('should call onPress then press button', async () => {
        renderComponent();

        /* Get touchable */
        const touchable = screen.getByTestId('button-touchable');
        await user.press(touchable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});