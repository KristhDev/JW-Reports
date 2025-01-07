import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Mocks */
import { initialUIStateMock, resetPasswordMock, setErrorFormMock, useAuthSpy, useStatusSpy, useUISpy } from '@mocks';

/* Modules */
import { ForgotPassword } from '@auth';

const renderScreen = () => render(<ForgotPassword />);

describe('Test in <ForgotPassword /> screen', () => {
    useAuthSpy.mockImplementation(() => ({
        state: { isAuthLoading: false },
        resetPassword: resetPasswordMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: initialUIStateMock
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
        expect(title).toHaveTextContent('OLVIDE MI CONTRASEÑA');
    });
});