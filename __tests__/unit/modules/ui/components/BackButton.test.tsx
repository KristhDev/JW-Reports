import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onPressMock } from '../../../../../jest.setup';

/* Modules */
import { BackButton } from '../../../../../src/modules/ui';
import { darkColors } from '../../../../../src/modules/theme';

const user = userEvent.setup();
const renderComponent = (iconColor?: string) => render(<BackButton onPress={ onPressMock } color={ iconColor } />);

describe('Test in <BackButton /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', async () => {
        renderComponent(darkColors.icon)

        /* Get pressable of button and check color */
        const pressable = screen.getByTestId('fab-pressable');
        const icon = await pressable.findByProps({ name: 'arrow-back-outline' });
        expect(icon.props).toHaveProperty('color', darkColors.icon);
    });

    it('should render default icon color', async () => {
        renderComponent();

        /* Get pressable of button and check icon */
        const pressable = screen.getByTestId('fab-pressable');
        const icon = await pressable.findByProps({ name: 'arrow-back-outline' });
        expect(icon.props).toHaveProperty('color', darkColors.button);
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