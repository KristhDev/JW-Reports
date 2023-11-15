import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

/* Components */
import { RadioBtn } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { onPressMock } from '../../../jest.setup';

const radioLabel = 'Label test';
const radioValue = 'value test';

/* Mock hooks */
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

        /* Get label of radio button */
        const label = screen.getByTestId('radio-btn-text');

        /* Check if label exists and contain text pass by props */
        expect(label).toBeTruthy();
        expect(label.props.children).toBe(radioLabel);
    });

    it('should call onPress when pressed', () => {

        /* Get label of radio button */
        const labelPress = screen.getByTestId('radio-btn-text');
        fireEvent.press(labelPress);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});