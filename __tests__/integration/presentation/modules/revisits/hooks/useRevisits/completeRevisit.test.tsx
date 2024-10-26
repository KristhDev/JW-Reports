import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseRevisits, renderUseRevisits } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    onErrorMock,
    revisitsMock,
    RevisitsServiceSpy,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Modules */
import { authMessages } from '@auth';
import { revisitsMessages } from '@revisits';

const initialStoreMock = () => getMockStoreUseRevisits({
    auth: initialAuthStateMock,
    revisits: initialRevisitsStateMock,
    status: initialStatusStateMock
})

const authStoreMock = () => getMockStoreUseRevisits({
    auth: authenticateStateMock,
    revisits: initialRevisitsStateMock,
    status: initialStatusStateMock
});

const revisitMock = {
    ...revisitsMock[0],
    userId: authenticateStateMock.user.id
}

describe('Test useRevisits hook - completeRevisit', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should complete revisit successfully', async () => {
        RevisitsServiceSpy.complete.mockResolvedValueOnce({ ...revisitsMock[0], done: true });

        const mockStore = authStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            result.current.useRevisits.setSelectedRevisit(revisitMock);
        });

        await act(async () => {
            await result.current.useRevisits.completeRevisit(onErrorMock);
        });

        /* Check if selectedRevisit and revisits are changed */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            selectedRevisit: {
                ...result.current.useRevisits.state.selectedRevisit,
                done: true,
                nextVisit: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastRevisit: {
                ...result.current.useRevisits.state.lastRevisit,
                nextVisit: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if onError isnt called */
        expect(onErrorMock).not.toHaveBeenCalled();
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = initialStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.completeRevisit(onErrorMock);
        });

        /**
         * Check if revisits state is equal to initial state and onFinish
         * is called one time
         */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);
        expect(onErrorMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should faild if selectedRevisit is empty', async () => {
        const mockStore = authStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.completeRevisit(onErrorMock);
        });

        /**
         * Check if revisits state is equal to initial state and onFinish
         * is called one time
         */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);
        expect(onErrorMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: revisitsMessages.UNSELECTED_COMPLETE
        });
    });
});