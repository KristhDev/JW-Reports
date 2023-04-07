import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

/* Components */
import { EyeBtn } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const onToggleMock = jest.fn();

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <EyeBtn /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(
            <EyeBtn
                onToggle={ onToggleMock }
                value
            />
        );

        jest.clearAllMocks();
    });

    it('should to match the snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call onToggle when pressed', () => {

        /* Get touchable */
        const touchable = screen.getByTestId('eye-btn-touchable');
        fireEvent.press(touchable);

        /* Check of onToggle is called one times with respective args */
        expect(onToggleMock).toHaveBeenCalledTimes(1);
        expect(onToggleMock).toHaveBeenCalledWith(false);
    });

    it('should change icon when value is false', () => {
        render(
            <EyeBtn
                onToggle={ onToggleMock }
                value={ false }
            />
        );

        /* Get touchable and check respective icon */
        const touchable = screen.getByTestId('eye-btn-touchable');
        expect(touchable.props.children[0].props.name).toBe('eye-outline');
    });
});