import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { SectionBtn } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const text = 'Section text test';
const subText = 'Section sub text test';
const onPressMock = jest.fn();

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
        const textElement = screen.getByTestId('section-btn-text');
        const subTextElement = screen.getByTestId('section-btn-sub-text');

        expect(textElement).toBeTruthy();
        expect(textElement.props.children).toBe(text);
        expect(subTextElement).toBeTruthy();
        expect(subTextElement.props.children).toBe(subText);
    });

    it('should call onPress when pressed', () => {
        const touchable = screen.getByTestId('section-btn-touchable');
        fireEvent.press(touchable);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});