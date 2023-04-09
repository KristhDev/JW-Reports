import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react-native';
import { Image } from 'react-native-image-crop-picker';

/* Screens */
import { AddOrEditRevisit } from '../../../src/screens/revisits';

/* Features */
import { revisitsState, selectedRevisitState } from '../../features/revisits';

/* Hooks */
import { useImage, useRevisits, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const image: Image = {
    height: 200,
    mime: 'image/jpeg',
    path: 'https://local-image.com/images.jpg',
    size: 120,
    width: 200
}

/* Mock hooks */
jest.mock('../../../src/hooks/useImage.ts');
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <AddOrEditRevisit /> screen', () => {
    (useImage as jest.Mock).mockReturnValue({
        image,
        takeImageToGallery: jest.fn(),
        takePhoto: jest.fn()
    });

    (useRevisits as jest.Mock).mockReturnValue({
        state: {
            ...revisitsState,
            selectedRevisit: {
                ...revisitsState.selectedRevisit,
                next_visit: '2022-12-29 00:00:00'
            }
        },
        saveRevisit: jest.fn(),
        updateRevisit: jest.fn()
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: jest.fn()
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<AddOrEditRevisit />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title when selectedRevisit is empty', async () => {
        await waitFor(() => {
            render(<AddOrEditRevisit />);
        });

        await act(async () => {
            await waitFor(() => {

                /* Get title */
                const title = screen.getByTestId('title-text');

                /* Check if title exists and contain value pass by props */
                expect(title).toBeTruthy();
                expect(title.props.children).toBe('Agregar revisita');
            });
        })
    });

    it('should render respective title when seletedPreaching isnt empty', async () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: selectedRevisitState,
            saveRevisit: jest.fn(),
            updateRevisit: jest.fn()
        });

        await waitFor(() => {
            render(<AddOrEditRevisit />);
        });

        await act(async () => {
            await waitFor(() => {

                /* Get title */
                const title = screen.getByTestId('title-text');

                /* Check if title exists and contain value pass by props */
                expect(title).toBeTruthy();
                expect(title.props.children).toBe('Editar revisita');
            });
        });
    });
});