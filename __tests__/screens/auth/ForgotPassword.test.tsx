import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react-native';

import { ForgotPassword } from '../../../src/screens/auth';

import { useAuth, useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <ForgotPassword /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false },
        resetPassword: jest.fn()
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: jest.fn()
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<ForgotPassword />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title', async () => {
        await waitFor(() => {
            render(<ForgotPassword />);
        });

        await act(async () => {
            await waitFor(() => {
                const title = screen.getByTestId('title-text');

                expect(title).toBeTruthy();
                expect(title.props.children).toBe('Olvide mi contraseña');
            });
        })
    });
});