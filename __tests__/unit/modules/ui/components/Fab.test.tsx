import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Setup */
import { onPressMock } from '../../../../../jest.setup';

/* Modules */
import { Fab } from '../../../../../src/modules/ui';
import { darkColors } from '../../../../../src/modules/theme';

const user = userEvent.setup();

const renderComponent = () => render(
    <Fab
        color={ darkColors.button }
        icon={
            <Ionicons
                name="flask-outline"
                size={ 40 }
                testID="fab-icon"
            />
        }
        onPress={ onPressMock }
        touchColor="rgba(0, 0, 0, 0.15)"
    />
);

describe('Test in <Fab /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent();

        /* Get pressable and icon */
        const pressable = screen.getByTestId('fab-pressable');
        const icon = screen.getByTestId('fab-icon');

        /* Check values of elements */
        expect(pressable.props.style[0].backgroundColor).toBe(darkColors.button);
        expect(icon).toBeTruthy();
    });

    it('should call onPress when pressed', async () => {
        renderComponent();

        /* Get pressable */
        const pressable = screen.getByTestId('fab-pressable');
        await user.press(pressable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});