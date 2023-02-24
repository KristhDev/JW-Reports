import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react-native';

import { Login } from '../../../src/screens/auth';

import { useAuth, useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Login /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false },
        signIn: jest.fn()
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: jest.fn()
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors, selectedTheme: 'dark' },
        setTheme: jest.fn()
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<Login />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title', async () => {
        await waitFor(() => {
            render(<Login />);
        });

        await act(async () => {
            await waitFor(() => {
                const title = screen.getByTestId('title-text');

                expect(title).toBeTruthy();
                expect(title.props.children).toBe('Ingresar');
            });
        })
    });
});