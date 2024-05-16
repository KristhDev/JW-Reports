import React from 'react';
import { act, render, screen, waitFor, userEvent } from '@testing-library/react-native';

/* Setup */
import { onCloseMock } from '../../../../../jest.setup';

/* Mocks */
import { saveRevisitMock, selectedRevisitStateMock, setErrorFormMock } from '../../../../mocks';

/* Modules */
import { RevisitModal, useRevisits } from '../../../../../src/modules/revisits';
import { useStatus } from '../../../../../src/modules/shared';

const completeMsg = 'Test complete msg'
const completeRevisitMock = jest.fn().mockResolvedValue(completeMsg);

/* Mock hooks */
jest.mock('../../../../../src/modules/revisits/hooks/useRevisits.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderScreen = () => render(
    <RevisitModal
        isOpen
        onClose={ onCloseMock }
    />
);

describe('Test in <RevisitModal /> screen', () => {
    (useRevisits as jest.Mock).mockReturnValue({
        state: selectedRevisitStateMock,
        completeRevisit: completeRevisitMock,
        saveRevisit: saveRevisitMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderScreen();
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title', async () => {
        await waitFor(() => {
            renderScreen();
        });

        const selectedRevisit = selectedRevisitStateMock.selectedRevisit;

        const modalTitle = (selectedRevisit.done)
            ? `¿Quieres volver a visitar a ${ selectedRevisit.personName }?`
            : '¿Está seguro de marcar esta revisitada como visitada?';

        /* Get modal title */
        const title = await screen.findByTestId('revisit-modal-title');

        /* Check if title exists and contain respective value */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(modalTitle);
    });

    it('should call completeRevisit when selectedRevisit.done is false', async () => {
        await waitFor(() => {
            renderScreen();
        });

        const pressable = (await screen.findAllByTestId('button-touchable'))[1];
        await user.press(pressable);

        /* CheckCheck if completeRevist is called with respective arg */
        expect(completeRevisitMock).toHaveBeenCalledTimes(1);
        expect(completeRevisitMock).toHaveBeenCalledWith(onCloseMock);

        /* Get complete text */
        const completeMsgText = await screen.findByTestId('revisit-modal-complete-msg');

        /* Check if complete text exists and contain respective value */
        expect(completeMsgText).toBeOnTheScreen();
        expect(completeMsgText).toHaveTextContent(completeMsg);
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
            renderScreen();
        });

        const selectedRevisit = selectedRevisitStateMock.selectedRevisit;

        /* Get next step touchable */
        const pressable = (await screen.findAllByTestId('button-touchable'))[1];
        await user.press(pressable);

        /* Get confirm touchable */
        const pressableConfirm = (await screen.findAllByTestId('button-touchable'))[2];
        await user.press(pressableConfirm);

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
            renderScreen();
        });

        /* Get loader and check if exists */
        const loader = await screen.findByTestId('revisit-modal-loading');
        expect(loader).toBeOnTheScreen();
    });
});