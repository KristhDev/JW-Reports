import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Components */
import { Title } from '@ui';

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
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(titleText);
    });
});