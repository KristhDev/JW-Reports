import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Mocks */
import { onCleanMock, onSearchMock } from '@mocks';

/* Modules */
import { SearchInput } from '@ui';

const textValue = 'Search test';
const user = userEvent.setup();

const renderComponent = () => render(
    <SearchInput
        onClean={ onCleanMock }
        onSearch={ onSearchMock }
        refreshing={ false }
        searchTerm=""
    />
);

describe('Test in <SearchInput /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call onSearch', async () => {
        renderComponent();

        /* Get text input */
        const input = screen.getByTestId('search-input-text-input');
        await user.type(input, textValue, { submitEditing: true });

        /* Check if onSearch is called with respective value */
        expect(onSearchMock).toHaveBeenCalledTimes(1);
        expect(onSearchMock).toHaveBeenCalledWith(textValue);
    });

    it('should call onClean when press clear button', async () => {
        renderComponent();

        /* Get text input and clear touchable */
        const input = screen.getByTestId('search-input-text-input');
        const pressable = screen.getByTestId('search-input-clear-btn');

        await user.type(input, textValue);
        await user.press(pressable);

        /* Check if onClean is called one time */
        expect(onCleanMock).toHaveBeenCalledTimes(1);
    });
});