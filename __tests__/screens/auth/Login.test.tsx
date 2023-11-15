import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react-native';

/* Screens */
import { Login } from '../../../src/screens/auth';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { setErrorFormMock, setThemeMock, signInMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Login /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false },
        signIn: signInMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors, selectedTheme: 'dark' },
        setTheme: setThemeMock
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

        /* Get title */
        const title = await screen.findByTestId('title-text');

        await waitFor(() => {
            /* Check if title exists and contain value pass by props */
            expect(title).toBeTruthy();
            expect(title.props.children).toBe('Ingresar');
        });
    });
});