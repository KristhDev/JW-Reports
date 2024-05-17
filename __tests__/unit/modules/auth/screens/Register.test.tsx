import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Setup */
import { useAuthSpy, useStatusSpy, useThemeSpy } from '../../../../../jest.setup';

/* Mocks */
import { setErrorFormMock, setThemeMock, signUpMock } from '../../../../mocks';

/* Modules */
import { Register } from '../../../../../src/modules/auth';

const renderScreen = () => render(<Register />);

describe('Test in <Register /> screen', () => {
    useAuthSpy.mockImplementation(() => ({
        state: { isAuthLoading: false },
        signUp: signUpMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    useThemeSpy.mockImplementation(() => ({
        state: { theme: 'dark', selectedTheme: 'dark' },
        setTheme: setThemeMock
    }));

    it('should to match snapshot', async () => {
        renderScreen();

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
        expect(title).toHaveTextContent('Crear cuenta');
    });
});