import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Mocks */
import {
    imageModelMock,
    initialUIState,
    revisitsStateMock,
    selectedRevisitStateMock,
    useImageSpy,
    useRevisitsSpy,
    useStatusSpy,
    useUISpy,
    useVoiceRecorderSpy
} from '@mocks';

/* Modules */
import { AddOrEditRevisit } from '@revisits';

const renderScreen = () => render(<AddOrEditRevisit />);

describe('Test in <AddOrEditRevisit /> screen', () => {
    useRevisitsSpy.mockImplementation(() => ({
        state: {
            ...revisitsStateMock,
            selectedRevisit: {
                ...revisitsStateMock.selectedRevisit,
                next_visit: '2022-12-29 00:00:00'
            }
        },
        saveRevisit: jest.fn(),
        updateRevisit: jest.fn()
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: jest.fn()
    }) as any);

    useImageSpy.mockImplementation(() => ({
        image: imageModelMock,
        takeImageToGallery: jest.fn(),
        takePhoto: jest.fn()
    }) as any);

    useUISpy.mockImplementation(() => ({ state: initialUIState }) as any);

    useVoiceRecorderSpy.mockImplementation(() => ({
        isRecording: false,
        record: '',
        startRecording: jest.fn(),
        stopRecording: jest.fn()
    }));

    it('should to match snapshot', async () => {
        renderScreen();

        await act(async () => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title when selectedRevisit is empty', async () => {
        renderScreen();

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('AGREGAR REVISITA');
    });

    it('should render respective title when seletedPreaching isnt empty', async () => {

        /* Mock data of useRevisits */
        useRevisitsSpy.mockImplementation(() => ({
            state: selectedRevisitStateMock,
            saveRevisit: jest.fn(),
            updateRevisit: jest.fn()
        }) as any);

        renderScreen();

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('EDITAR REVISITA');
    });
});