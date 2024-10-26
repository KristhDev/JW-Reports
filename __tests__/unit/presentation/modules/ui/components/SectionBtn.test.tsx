import React from 'react';
import { View } from 'react-native';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Mocks */
import { onPressMock } from '@mocks';

/* Modules */
import { SectionBtn, SectionBtnProps } from '@ui';

const user = userEvent.setup();

const renderComponent = (props: SectionBtnProps) => render(
    <SectionBtn { ...props }>
        <View testID="section-btn-children" />
    </SectionBtn>
);

const text = 'Section text test';
const subText = 'Section sub text test';

describe('Test in <SectionBtn /> component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match the snapshot', () => {
        renderComponent({ subText, text, onPress: onPressMock });
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent({ subText, text, onPress: onPressMock });

        /* Get elements with props of component */
        const textElement = screen.getByTestId('section-btn-text');
        const subTextElement = screen.getByTestId('section-btn-sub-text');

        /* Check if elemets exists and containt props */
        expect(textElement).toBeOnTheScreen();
        expect(textElement).toHaveTextContent(text);
        expect(subTextElement).toBeOnTheScreen();
        expect(subTextElement).toHaveTextContent(subText);
    });

    it('should call onPress when pressed', async () => {
        renderComponent({ subText, text, onPress: onPressMock });

        /* Get pressable */
        const pressable = screen.getByTestId('section-btn-pressable');
        await user.press(pressable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('should render children when passed', () => {
        renderComponent({ subText, text, onPress: onPressMock });

        /* Get children */
        const children = screen.queryByTestId('section-btn-children');

        /* Check if children exists */
        expect(children).toBeOnTheScreen();
    });
});