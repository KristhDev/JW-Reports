import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Mocks */
import { onPressMock } from '@mocks';

/* Components */
import { Link, LinkProps } from '@ui';

const renderComponent = (props: LinkProps) => render(<Link { ...props } />);
const user = userEvent.setup();

describe('Test in <Link /> component', () => {
    it('should to match snapshot', () => {
        renderComponent({
            children: 'Test text',
            onPress: onPressMock,
        });

        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent({
            children: 'Test text',
            onPress: onPressMock,
            testID: 'link-test',
        });

        /* Get elements with props of component */
        const text = screen.queryByText('Test text');
        const touchable = screen.queryByTestId('link-test');

        /* Check if exists this elemets and has props */
        expect(text).toBeOnTheScreen();
        expect(text).toHaveTextContent('Test text');

        expect(touchable).toBeOnTheScreen();
        expect(touchable).toHaveProp('testID', 'link-test');
    });

    it('should call onPress when pressed', async () => {
        renderComponent({
            children: 'Test text',
            onPress: onPressMock,
        });

        /* Get pressable */
        const pressable = screen.getByTestId('link-touchable');
        await user.press(pressable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});