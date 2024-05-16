import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';

/* Mocks */
import { imageMock, revisitsStateMock, selectedRevisitStateMock } from '../../../../mocks';

/* Modules */
import { AddOrEditRevisit, useRevisits } from '../../../../../src/modules/revisits';
import { useImage, useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../src/hooks/useImage.ts');
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

const renderScreen = () => render(<AddOrEditRevisit />);

describe('Test in <AddOrEditRevisit /> screen', () => {
    (useImage as jest.Mock).mockReturnValue({
        image: imageMock,
        takeImageToGallery: jest.fn(),
        takePhoto: jest.fn()
    });

    (useRevisits as jest.Mock).mockReturnValue({
        state: {
            ...revisitsStateMock,
            selectedRevisit: {
                ...revisitsStateMock.selectedRevisit,
                next_visit: '2022-12-29 00:00:00'
            }
        },
        saveRevisit: jest.fn(),
        updateRevisit: jest.fn()
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: jest.fn()
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderScreen();
        });

        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective title when selectedRevisit is empty', async () => {
        await waitFor(() => {
            renderScreen();
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Agregar revisita');
    });

    it('should render respective title when seletedPreaching isnt empty', async () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: selectedRevisitStateMock,
            saveRevisit: jest.fn(),
            updateRevisit: jest.fn()
        });

        await waitFor(() => {
            renderScreen();
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Editar revisita');
    });
});