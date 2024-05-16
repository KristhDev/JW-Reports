import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Modules */
import { InfoText } from '../../../../../src/modules/ui';

const textInfo = 'Info text test';

const renderComponent = () => render(<InfoText text={ textInfo } />);

describe('Test in <InfoText /> component', () => {
    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent();

        /* Get text */
        const text = screen.getByTestId('info-text-text');

        /* Check if text exists and containt text pass by props */
        expect(text).toBeTruthy();
        expect(text.props.children).toBe(textInfo);
    });
});