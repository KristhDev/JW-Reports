import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onToggleMock } from '../../../../../jest.setup';

/* Modules */
import { EyeBtn } from '../../../../../src/modules/ui';

const user = userEvent.setup();

const renderComponent = () => render(
    <EyeBtn
        onToggle={ onToggleMock }
        value
    />
);

describe('Test in <EyeBtn /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match the snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call onToggle when pressed', async () => {
        renderComponent();

        /* Get touchable */
        const touchable = screen.getByTestId('eye-btn-touchable');
        await user.press(touchable);

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