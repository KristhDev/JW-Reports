import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';

/* Mocks */
import { setErrorFormMock, testUser, updateEmailMock, updatePasswordMock } from '../../../../mocks';

/* Modules */
import { Credentials, useAuth } from '../../../../../src/modules/auth';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

describe('Test in <ForgotPassword /> screen', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false, user: testUser },
        updateEmail: updateEmailMock,
        updatePassword: updatePasswordMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<Credentials />);
        });

        await waitFor(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title', async () => {
        await waitFor(() => {
            render(<Credentials />);
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title.props.children).toBe('Credenciales');
    });
});