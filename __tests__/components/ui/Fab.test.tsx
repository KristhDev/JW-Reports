import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Fab } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const onPressMock = jest.fn();

jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Fab /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(
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

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        const touchable = screen.getByTestId('fab-touchable');
        const icon = screen.getByTestId('fab-icon');

        expect(touchable.props.style[2][0].backgroundColor).toBe(darkColors.button);
        expect(icon).toBeTruthy();
    });

    it('should call onPress when pressed', () => {
        const touchable = screen.getByTestId('fab-touchable');
        fireEvent.press(touchable);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});