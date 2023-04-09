import React from 'react';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react-native';

/* Screens */
import { RevisitModal } from '../../../src/screens/revisits';

/* Hooks */
import { useRevisits, useStatus, useTheme } from '../../../src/hooks';

/* Features */
import { selectedRevisitState } from '../../features/revisits';

/* Theme */
import { darkColors } from '../../../src/theme';

const completeMsg = 'Test complete msg'

const completeRevisitMock = jest.fn().mockImplementation(() => Promise.resolve(completeMsg));
const saveRevisitMock = jest.fn();
const setErrorFormMock = jest.fn();
const onCloseMock = jest.fn();

/* Mock hooks */
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <RevisitModal /> screen', () => {
    (useRevisits as jest.Mock).mockReturnValue({
        state: selectedRevisitState,
        completeRevisit: completeRevisitMock,
        saveRevisit: saveRevisitMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(
                <RevisitModal
                    isOpen
                    onClose={ onCloseMock }
                />
            );
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title', async () => {
        await waitFor(() => {
            render(
                <RevisitModal
                    isOpen
                    onClose={ onCloseMock }
                />
            );
        });

        const selectedRevisit = selectedRevisitState.selectedRevisit;

        const modalTitle = (selectedRevisit.done)
            ? `¿Quieres volver a visitar a ${ selectedRevisit.person_name }?`
            : '¿Está seguro de marcar esta revisitada como visitada?';

        await act(async () => {
            await waitFor(() => {

                /* Get modal title */
                const title = screen.getByTestId('revisit-modal-title');

                /* Check if title exists and contain respective value */
                expect(title).toBeTruthy();
                expect(title.props.children).toBe(modalTitle);
            });
        });
    });

    it('should call completeRevisit when selectedRevisit.done is false', async () => {
        await waitFor(() => {
            render(
                <RevisitModal
                    isOpen
                    onClose={ onCloseMock }
                />
            );
        });

        await act(async () => {
            await waitFor(() => {

                /* Get touchable */
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                /* Check if completeRevist is called one time */
                expect(completeRevisitMock).toHaveBeenCalledTimes(1);
            });

            /* CheckCheck if completeRevist is called with respective arg */
            expect(completeRevisitMock).toHaveBeenCalledWith(onCloseMock);

            /* Get complete text */
            const completeMsgText = screen.getByTestId('revisit-modal-complete-msg');

            /* Check if complete text exists and contain respective value */
            expect(completeMsgText).toBeTruthy();
            expect(completeMsgText.props.children).toBe(completeMsg);
        });
    });

    it('should call saveRevisit when selectedRevisit.done is true', async () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...selectedRevisitState,
                selectedRevisit: {
                    ...selectedRevisitState.selectedRevisit,
                    done: true
                }
            },
            completeRevisit: completeRevisitMock,
            saveRevisit: saveRevisitMock
        });

        await waitFor(() => {
            render(
                <RevisitModal
                    isOpen
                    onClose={ onCloseMock }
                />
            );
        });

        const selectedRevisit = selectedRevisitState.selectedRevisit;

        await act(async () => {
            await waitFor(() => {

                /* Get next step touchable */
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                /* Get confirm touchable */
                const touchableConfirm = screen.getAllByTestId('button-touchable')[2];
                fireEvent.press(touchableConfirm);

                /* Check if saveRevisit is called one time */
                expect(saveRevisitMock).toHaveBeenCalledTimes(1);
            });

            /* Check if saveRevisit with respective value */
            expect(saveRevisitMock).toHaveBeenCalledWith({
                revisitValues: {
                    about: selectedRevisit.about,
                    address: selectedRevisit.address,
                    person_name: selectedRevisit.person_name,
                    next_visit: expect.any(Date)
                },
                back: false,
                onFinish: onCloseMock
            });
        });
    });

    it('should render loader when isRevisitLoading is true', async () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...selectedRevisitState,
                isRevisitLoading: true
            },
            completeRevisit: completeRevisitMock,
            saveRevisit: saveRevisitMock
        });

        await waitFor(() => {
            render(
                <RevisitModal
                    isOpen
                    onClose={ onCloseMock }
                />
            );
        });

        await act(async () => {
            await waitFor(() => {

                /* Get loader and check if exists */
                const loader = screen.getByTestId('revisit-modal-loading');
                expect(loader).toBeTruthy();
            });
        });
    });
});