import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

/* Components */
import { Checkbox } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const checkboxLabel = 'Label test';
const onPressMock = jest.fn();

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <RadioBtn /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(
            <Checkbox
                label={ checkboxLabel }
                onPress={ onPressMock }
                status="checked"
            />
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render label', () => {

        /* Get label of radio button */
        const label = screen.getByTestId('checkbox-text');

        /* Check if label exists and contain text pass by props */
        expect(label).toBeTruthy();
        expect(label.props.children).toBe(checkboxLabel);
    });

    it('should call onPress when pressed', () => {

        /* Get checkbox element */
        const checkbox = screen.getByTestId('checkbox-checkbox');
        fireEvent.press(checkbox);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});