import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const btnText = 'Test text';
const onPressMock = jest.fn();

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
        const text = screen.getByTestId('button-text');
        const icon = screen.getByTestId('button-icon');

        expect(text).toBeTruthy();
        expect(text.props.children).toBe(btnText);
        expect(icon).toBeTruthy();
    });

    it('should call onPress then press button', () => {
        const touchable = screen.getByTestId('button-touchable');
        fireEvent.press(touchable);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});