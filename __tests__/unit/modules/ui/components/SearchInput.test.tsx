import React from 'react';
import { fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';

/* Setup */
import { onCleanMock, onSearchMock } from '../../../../../jest.setup';

/* Modules */
import { SearchInput } from '../../../../../src/modules/ui';
import { darkColors } from '../../../../../src/modules/theme';

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
        const touchable = screen.getByTestId('search-input-clear-btn');

        await user.type(input, textValue);
        await user.press(touchable);

        /* Check if onClean is called one time */
        expect(onCleanMock).toHaveBeenCalledTimes(1);
    });

    it('should change border color when input is focused', async () => {
        renderComponent();

        /* Get text input and container */
        const input = screen.getByTestId('search-input-text-input');
        const inputContainer = screen.getByTestId('search-input-text-input-container');

        await waitFor(() => {
            fireEvent(input, 'onFocus');

            /* Check if input is focused */
            expect(inputContainer.props.style.borderColor).toBe(darkColors.button);
        });
    });
});