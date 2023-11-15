import React from 'react';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react-native';

/* Screens */
import { RevisitModal } from '../../../src/screens/revisits';

/* Hooks */
import { useRevisits, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { onCloseMock } from '../../../jest.setup';

/* Mocks */
import { saveRevisitMock, selectedRevisitStateMock, setErrorFormMock } from '../../mocks';

const completeMsg = 'Test complete msg'
const completeRevisitMock = jest.fn().mockImplementation(() => Promise.resolve(completeMsg));

/* Mock hooks */
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <RevisitModal /> screen', () => {
    (useRevisits as jest.Mock).mockReturnValue({
        state: selectedRevisitStateMock,
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

        const selectedRevisit = selectedRevisitStateMock.selectedRevisit;

        const modalTitle = (selectedRevisit.done)
            ? `¿Quieres volver a visitar a ${ selectedRevisit.personName }?`
            : '¿Está seguro de marcar esta revisitada como visitada?';

        /* Get modal title */
        const title = await screen.findByTestId('revisit-modal-title');

        await waitFor(() => {
            /* Check if title exists and contain respective value */
            expect(title).toBeTruthy();
            expect(title.props.children).toBe(modalTitle);
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

        const touchable = (await screen.findAllByTestId('button-touchable'))[1];

        await waitFor(() => {
            /* Get touchable */
            fireEvent.press(touchable);
        });

        /* CheckCheck if completeRevist is called with respective arg */
        expect(completeRevisitMock).toHaveBeenCalledTimes(1);
        expect(completeRevisitMock).toHaveBeenCalledWith(onCloseMock);

        /* Get complete text */
        const completeMsgText = await screen.findByTestId('revisit-modal-complete-msg');

        /* Check if complete text exists and contain respective value */
        expect(completeMsgText).toBeTruthy();
        expect(completeMsgText.props.children).toBe(completeMsg);
    });

    it('should call saveRevisit when selectedRevisit.done is true', async () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...selectedRevisitStateMock,
                selectedRevisit: {
                    ...selectedRevisitStateMock.selectedRevisit,
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

        const selectedRevisit = selectedRevisitStateMock.selectedRevisit;

        /* Get next step touchable */
        const touchable = (await screen.findAllByTestId('button-touchable'))[1];

        await waitFor(() => {
            fireEvent.press(touchable);
        });

        /* Get confirm touchable */
        const touchableConfirm = (await screen.findAllByTestId('button-touchable'))[2];

        await waitFor(() => {
            fireEvent.press(touchableConfirm);
        });

        /* Check if saveRevisit with respective value */
        expect(saveRevisitMock).toHaveBeenCalledTimes(1);
        expect(saveRevisitMock).toHaveBeenCalledWith({
            revisitValues: {
                about: selectedRevisit.about,
                address: selectedRevisit.address,
                personName: selectedRevisit.personName,
                nextVisit: expect.any(Date)
            },
            back: false,
            onFinish: onCloseMock
        });
    });

    it('should render loader when isRevisitLoading is true', async () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...selectedRevisitStateMock,
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

        /* Get loader and check if exists */
        const loader = await screen.findByTestId('revisit-modal-loading');
        expect(loader).toBeTruthy();
    });
});