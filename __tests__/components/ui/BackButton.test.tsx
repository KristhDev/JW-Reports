import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { BackButton } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const onPressMock = jest.fn();

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

        const touchable = screen.getByTestId('fab-touchable');
        expect(touchable.props.children[0].props.color).toBe(darkColors.icon);
    });

    it('should render default icon color', () => {
        const touchable = screen.getByTestId('fab-touchable');
        expect(touchable.props.children[0].props.color).toBe(darkColors.button);
    });

    it('should call onPress when pressed', () => {
        const touchable = screen.getByTestId('fab-touchable');
        fireEvent.press(touchable);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});