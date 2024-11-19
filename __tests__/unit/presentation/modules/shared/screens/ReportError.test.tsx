import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Mocks */
import { initialUIState, useEmailSpy, useImageSpy, useStatusSpy, useThemeSpy, useUISpy } from '@mocks';

/* Modules */
import { ReportErrorScreen } from '@shared';

const renderScreen = () => render(<ReportErrorScreen />);

useEmailSpy.mockImplementation(() => ({
    sendFeedbackEmail: jest.fn()
}) as any);

useImageSpy.mockImplementation(() => ({
    image: null,
    takeImageToGallery: jest.fn(),
    takePhoto: jest.fn(),
}) as any);

useStatusSpy.mockImplementation(() => ({
    setErrorForm: jest.fn()
}) as any);

useThemeSpy.mockImplementation(() => ({
    state: { theme: 'dark' }
}) as any);

useUISpy.mockImplementation(() => ({ state: initialUIState }) as any);

describe('Test in <ReportErrorScreen /> screen', () => {
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
        expect(title).toHaveTextContent('REPORTAR ERROR');
    });
});