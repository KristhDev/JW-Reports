import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';

/* Mocks */
import { resetPasswordMock, setErrorFormMock } from '../../../../mocks';

/* Modules */
import { ForgotPassword, useAuth } from '../../../../../src/modules/auth';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/status/hooks/useStatus.ts');

describe('Test in <ForgotPassword /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false },
        resetPassword: resetPasswordMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<ForgotPassword />);
        });

        await waitFor(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title', async () => {
        await waitFor(() => {
            render(<ForgotPassword />);
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        await waitFor(() => {
            /* Check if title exists and contain value pass by props */
            expect(title).toBeTruthy();
            expect(title.props.children).toBe('Olvide mi contraseña');
        });
    });
});