import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { onPressMock } from '../../../jest.setup';

const btnText = 'Test text';

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Button /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(
            <Button
                icon={
                    <Icon
                        name="flask-outline"
                        size={ 20 }
                        testID="button-icon"
                    />
                }
                onPress={ onPressMock }
                text={ btnText }
            />
        );
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {

        /* Get elements of component with props */
        const text = screen.getByTestId('button-text');
        const icon = screen.getByTestId('button-icon');

        /* Check if elements exists and contain props */
        expect(text).toBeTruthy();
        expect(text.props.children).toBe(btnText);
        expect(icon).toBeTruthy();
    });

    it('should call onPress then press button', () => {

        /* Get touchable */
        const touchable = screen.getByTestId('button-touchable');
        fireEvent.press(touchable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});