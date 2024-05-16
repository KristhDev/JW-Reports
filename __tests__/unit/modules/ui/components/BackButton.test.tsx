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

    it('should render respective props', () => {
        renderComponent(darkColors.icon)

        /* Get touchable of button and check color */
        const touchable = screen.getByTestId('fab-touchable');
        const iconColor = touchable.props.children[0].props.color;
        expect(iconColor).toBe(darkColors.icon);
    });

    it('should render default icon color', () => {
        renderComponent();

        /* Get touchable of button and check icon */
        const touchable = screen.getByTestId('fab-touchable');
        const iconColor = touchable.props.children[0].props.color;
        expect(iconColor).toBe(darkColors.button);
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