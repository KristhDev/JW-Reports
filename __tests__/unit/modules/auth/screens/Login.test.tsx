import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';

/* Mocks */
import { setErrorFormMock, setThemeMock, signInMock } from '../../../../mocks';

/* Modules */
import { Login, useAuth } from '../../../../../src/modules/auth';
import { useStatus } from '../../../../../src/modules/shared';
import { useTheme } from '../../../../../src/modules/theme';

/* Mock hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');
jest.mock('../../../../../src/modules/shared/hooks/useTheme.ts');

describe('Test in <Login /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false },
        signIn: signInMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        setTheme: setThemeMock
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<Login />);
        });

        await waitFor(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title', async () => {
        await waitFor(() => {
            render(<Login />);
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title.props.children).toBe('Ingresar');
    });
});