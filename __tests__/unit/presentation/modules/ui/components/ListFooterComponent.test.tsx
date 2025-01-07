import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Modules */
import { ListFooterComponent } from '@ui';

const renderComponent = (showLoader: boolean, marginTopPlus: boolean) => render(
    <ListFooterComponent
        showLoader={ showLoader }
        marginTopPlus={ marginTopPlus }
    />
);

describe('Test in <ListFooterComponent /> component', () => {
    it('should to match snapshot', () => {
        renderComponent(true, false);
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render loader', () => {
        renderComponent(true, false);

        /* Get loader and check if exists */
        const loader = screen.getByTestId('loader');
        expect(loader).toBeTruthy();
    });

    it('should not render loader', () => {
        renderComponent(false, true);

        /* Check if content of component is null */
        expect(screen.toJSON()).toBeNull();
    });
});