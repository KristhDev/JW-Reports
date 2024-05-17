import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, mockUseNavigation } from '../../../../../../jest.setup';
import { getMockStoreUseRevisits, renderUseRevisits } from '../../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    testCredentials,
    testRevisit,
    wifiMock
} from '../../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUseRevisits({
    auth: initialAuthStateMock,
    revisits: initialRevisitsStateMock,
    status: initialStatusStateMock
});

describe('Test useRevisits hook - deleteRevisit', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete revisit successfully', async () => {
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: true,
                onFinish: onFinishMock,
                revisitValues: testRevisit
            });
        });

        await act(async () => {
            result.current.useRevisits.setSelectedRevisit(result.current.useRevisits.state.revisits[0]);
        });

        await act(async () => {
            await result.current.useRevisits.deleteRevisit(false, onFinishMock);
        });

        /* Check if revisits state not contain revisit deleted */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            selectedRevisit: {
                ...initialRevisitsStateMock.selectedRevisit,
                nextVisit: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            revisits: [],
            lastRevisit: {
                ...result.current.useRevisits.state.lastRevisit,
                nextVisit: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /**
         * Check if length of useRevisits.state.revisits is 0, onFinish is called
         * two time and navigate is called one time
         */
        expect(result.current.useRevisits.state.revisits).toHaveLength(0);
        expect(onFinishMock).toHaveBeenCalledTimes(2);

        /* Check if navigate is called with respective arg */
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('RevisitsTopTabsNavigation');

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Has eliminado tu revisita correctamente.'
        });
    });

    it('should fail when user inst authenticated', async () => {
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.deleteRevisit(false, onFinishMock);
        });

        /* Check if revisits state inst changed and onFinish is called one time */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should fail when selectedRevisit is empty', async () => {
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.deleteRevisit(false, onFinishMock);
        });

        /* Check if revisits state inst changed and onFinish is called one time */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una revisita seleccionada para eliminar.'
        });
    });
});