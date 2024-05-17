import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Setup */
import { useAuthSpy, useStatusSpy } from '../../../../../jest.setup';

/* Mocks */
import { resetPasswordMock, setErrorFormMock } from '../../../../mocks';

/* Modules */
import { ForgotPassword } from '../../../../../src/modules/auth';

const renderScreen = () => render(<ForgotPassword />);

describe('Test in <ForgotPassword /> screen', () => {
    useAuthSpy.mockImplementation(() => ({
        state: { isAuthLoading: false },
        resetPassword: resetPasswordMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    it('should to match snapshot', async () => {
        renderScreen()

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title', async () => {
        renderScreen();

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Olvide mi contraseña');
    });
});