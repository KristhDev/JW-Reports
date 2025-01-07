import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Modules */
import { ListEmptyComponent } from '@ui';

const emptyMessage = 'Empty message test';

const renderComponent = (showMsg = true) => render(
    <ListEmptyComponent
        msg={ emptyMessage }
        showMsg={ showMsg }
    />
);

describe('Test in <ListEmptyComponent /> component', () => {
    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render message', () => {
        renderComponent();

        /* Get text and check if containt message pass by props */
        const msg = screen.getByTestId('info-text-text');
        expect(msg).toHaveTextContent(emptyMessage);
    });

    it('should not render message', async () => {
        renderComponent(false);

        /* Check if content of component is null */
        expect(screen.toJSON()).toBeNull();
    });
});