import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { RadioBtn } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const radioLabel = 'Label test';
const radioValue = 'value test';
const onPressMock = jest.fn();

jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <RadioBtn /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(
            <RadioBtn
                label={ radioLabel }
                onPress={ onPressMock }
                value={ radioValue }
            />
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render label', () => {
        const label = screen.getByTestId('radio-btn-text');

        expect(label).toBeTruthy();
        expect(label.props.children).toBe(radioLabel);
    });

    it('should call onPress when pressed', () => {
        const labelPress = screen.getByTestId('radio-btn-text');
        fireEvent.press(labelPress);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});