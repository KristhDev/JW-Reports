import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';

/* Mocks */
import { setErrorFormMock, setThemeMock, signUpMock } from '../../../../mocks';

/* Modules */
import { Register, useAuth } from '../../../../../src/modules/auth';
import { useStatus } from '../../../../../src/modules/shared';
import { useTheme } from '../../../../../src/modules/theme';

/* Mock hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/status/hooks/useStatus.ts');
jest.mock('../../../../../src/modules/shared/hooks/useTheme.ts');

describe('Test in <Register /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false },
        signUp: signUpMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { theme: 'dark' },
        setTheme: setThemeMock
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<Register />);
        });

        await waitFor(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title', async () => {
        await waitFor(() => {
            render(<Register />);
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title.props.children).toBe('Crear cuenta');
    });
});