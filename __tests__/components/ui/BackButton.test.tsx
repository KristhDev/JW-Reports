import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

/* Components */
import { BackButton } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const onPressMock = jest.fn();

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <BackButton /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(<BackButton onPress={ onPressMock } />);
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        render(
            <BackButton
                onPress={ onPressMock }
                color={ darkColors.icon }
            />
        );

        /* Get touchable of button and check color */
        const touchable = screen.getByTestId('fab-touchable');
        expect(touchable.props.children[0].props.color).toBe(darkColors.icon);
    });

    it('should render default icon color', () => {

        /* Get touchable of button and check icon */
        const touchable = screen.getByTestId('fab-touchable');
        expect(touchable.props.children[0].props.color).toBe(darkColors.button);
    });

    it('should call onPress when pressed', () => {

        /* Get touchable */
        const touchable = screen.getByTestId('fab-touchable');
        fireEvent.press(touchable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});