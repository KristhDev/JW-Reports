import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onPressMock } from '../../../../../jest.setup';

/* Modules */
import { SectionBtn } from '../../../../../src/modules/ui';

const user = userEvent.setup();

const renderComponent = () => render(
    <SectionBtn
        onPress={ onPressMock }
        subText={ subText }
        text={ text }
    />
);

const text = 'Section text test';
const subText = 'Section sub text test';

describe('Test in <SectionBtn /> component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match the snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent();

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
        renderComponent();

        /* Get pressable */
        const pressable = screen.getByTestId('section-btn-pressable');
        await user.press(pressable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});