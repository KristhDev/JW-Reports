import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, mockUseNavigation, useNetworkSpy } from '../../../../../../jest.setup';
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

describe('Test useRevisits hook - deleteRevisit', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseRevisits({
            auth: initialAuthStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });
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

    it('should faild when user inst authenticated', async () => {
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

    it('should faild when selectedRevisit is empty', async () => {
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