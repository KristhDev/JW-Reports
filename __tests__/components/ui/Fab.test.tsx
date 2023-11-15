import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Fab } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { onPressMock } from '../../../jest.setup';

/* Mock hooks */
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

        /* Get tochable and icon */
        const touchable = screen.getByTestId('fab-touchable');
        const icon = screen.getByTestId('fab-icon');

        /* Check values of elements */
        expect(touchable.props.style[1][0].backgroundColor).toBe(darkColors.button);
        expect(icon).toBeTruthy();
    });

    it('should call onPress when pressed', () => {

        /* Get touchable */
        const touchable = screen.getByTestId('fab-touchable');
        fireEvent.press(touchable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});