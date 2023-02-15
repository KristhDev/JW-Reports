import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { SearchInput } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const onCleanMock = jest.fn();
const onSearchMock = jest.fn();
const textValue = 'Search test';

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
        const input = screen.getByTestId('search-input-text-input');

        await waitFor(() => {
            fireEvent(input, 'onChangeText', textValue);
            fireEvent(input, 'onSubmitEditing');

            expect(onSearchMock).toBeCalledTimes(1);
        });

        expect(onSearchMock).toBeCalledWith(textValue);
    });

    it('should call onClean when press clear button', async () => {
        const input = screen.getByTestId('search-input-text-input');
        const touchable = screen.getByTestId('search-input-clear-btn');

        await waitFor(() => {
            fireEvent(input, 'onChangeText', textValue);
        });

        fireEvent.press(touchable);

        expect(onCleanMock).toBeCalledTimes(1);
    });

    it('should change border color when input is focused', async () => {
        const input = screen.getByTestId('search-input-text-input');
        const inputContainer = screen.getByTestId('search-input-text-input-container');

        await waitFor(() => {
            fireEvent(input, 'onFocus');

            expect(inputContainer.props.style.borderColor).toBe(darkColors.button);
        });
    });
});