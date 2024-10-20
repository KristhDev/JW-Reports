import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

/* Setup */
import { onChangeValueMock } from '@test-setup';

/* Modules */
import { Switch, SwitchProps } from '@ui';

const renderComponent = (props: SwitchProps) => render(<Switch { ...props } />);

describe('Test in <Switch /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent({ onChange: onChangeValueMock, value: false });
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call onChange when pressed', async () => {
        renderComponent({ onChange: onChangeValueMock, value: false });

        const switchElement = screen.getByTestId('switch');
        fireEvent(switchElement, 'onChange', { nativeEvent: { value: true } });

        expect(onChangeValueMock).toHaveBeenCalledTimes(1);
        expect(onChangeValueMock).toHaveBeenCalledWith(true);
    });
});