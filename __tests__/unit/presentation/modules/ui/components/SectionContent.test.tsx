import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Modules */
import { SectionContent } from '@ui';

const contentTitle = 'Title test';
const renderComponent = () => render(<SectionContent title={ contentTitle } />);

describe('Test in <SectionContent /> component', () => {
    it('should to match the snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render title', () => {
        renderComponent();

        /* Get text of title */
        const title = screen.getByTestId('info-text-text');

        /* Check if title exists and contain respective value */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(contentTitle);
    });
});