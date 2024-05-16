import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
            <Icon
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

        /* Get tochable and icon */
        const touchable = screen.getByTestId('fab-touchable');
        const icon = screen.getByTestId('fab-icon');

        /* Check values of elements */
        expect(touchable.props.style[0].backgroundColor).toBe(darkColors.button);
        expect(icon).toBeTruthy();
    });

    it('should call onPress when pressed', async () => {
        renderComponent();

        /* Get touchable */
        const touchable = screen.getByTestId('fab-touchable');
        await user.press(touchable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});