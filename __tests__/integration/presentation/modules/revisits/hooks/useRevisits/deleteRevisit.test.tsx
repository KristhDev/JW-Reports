import { act } from '@testing-library/react-native';

/* Setups */
import { mockUseNavigation } from '@test-setup';
import { getMockStoreUseRevisits, renderUseRevisits } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    onFinishMock,
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

describe('Test useRevisits hook - deleteRevisit', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete revisit successfully', async () => {
        RevisitsServiceSpy.delete.mockImplementationOnce(() => Promise.resolve());

        const mockStore = authStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            result.current.useRevisits.setSelectedRevisit(revisitMock);
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
         * one time
         */
        expect(result.current.useRevisits.state.revisits).toHaveLength(0);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if navigate isnt called */
        expect(mockUseNavigation.navigate).not.toHaveBeenCalled();

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: revisitsMessages.DELETED_SUCCESS
        });
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = initialStoreMock();
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
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should faild if selectedRevisit is empty', async () => {
        const mockStore = authStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.deleteRevisit(false, onFinishMock);
        });

        /* Check if revisits state inst changed and onFinish is called one time */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: revisitsMessages.UNSELECTED_DELETE
        });
    });
});