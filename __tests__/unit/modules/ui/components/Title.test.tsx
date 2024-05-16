import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Components */
import { Title } from '../../../../../src/modules/ui';

const titleText = 'Title test';

const renderComponent = () => render(<Title text={ titleText } />);

describe('Test in <Title /> component', () => {
    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent();

        /* Get text of title */
        const title = screen.getByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title.props.children).toBe(titleText);
    });
});