import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

/* Components */
import { SectionBtn } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const text = 'Section text test';
const subText = 'Section sub text test';
const onPressMock = jest.fn();

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <SectionBtn /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(
            <SectionBtn
                onPress={ onPressMock }
                subText={ subText }
                text={ text }
            />
        );

        jest.clearAllMocks();
    });

    it('should to match the snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {

        /* Get elements with props of component */
        const textElement = screen.getByTestId('section-btn-text');
        const subTextElement = screen.getByTestId('section-btn-sub-text');

        /* Check if elemets exists and containt props */
        expect(textElement).toBeTruthy();
        expect(textElement.props.children).toBe(text);
        expect(subTextElement).toBeTruthy();
        expect(subTextElement.props.children).toBe(subText);
    });

    it('should call onPress when pressed', () => {

        /* Get touchable */
        const touchable = screen.getByTestId('section-btn-touchable');
        fireEvent.press(touchable);

        /* Check if onPress is called one time */
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});