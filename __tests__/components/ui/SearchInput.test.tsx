import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { SearchInput } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const onCleanMock = jest.fn();
const onSearchMock = jest.fn();
const textValue = 'Search test';

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <SearchInput /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(
            <SearchInput
                onClean={ onCleanMock }
                onSearch={ onSearchMock }
                refreshing={ false }
                searchTerm=""
            />
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call onSearch', async () => {

        /* Get text input */
        const input = screen.getByTestId('search-input-text-input');

        await waitFor(() => {

            /* Type a value and submit */
            fireEvent(input, 'onChangeText', textValue);
            fireEvent(input, 'onSubmitEditing');

            /* Check if onSearch is called one time */
            expect(onSearchMock).toBeCalledTimes(1);
        });

        /* Check if onSearch is called with respective value */
        expect(onSearchMock).toBeCalledWith(textValue);
    });

    it('should call onClean when press clear button', async () => {

        /* Get text input and clear touchable */
        const input = screen.getByTestId('search-input-text-input');
        const touchable = screen.getByTestId('search-input-clear-btn');

        await waitFor(() => {

            /* Type value */
            fireEvent(input, 'onChangeText', textValue);
        });

        /* Clear input text when press clear touchable */
        fireEvent.press(touchable);

        /* Check if onClean is called one time */
        expect(onCleanMock).toBeCalledTimes(1);
    });

    it('should change border color when input is focused', async () => {

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