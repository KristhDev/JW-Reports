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
    revisitsMock,
    RevisitsServiceSpy,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages } from '@application/constants';

const initialStoreMock = () => getMockStoreUseRevisits({
    auth: initialAuthStateMock,
    revisits: initialRevisitsStateMock,
    status: initialStatusStateMock
});

const authStoreMock = () => getMockStoreUseRevisits({
    auth: authenticateStateMock,
    revisits: initialRevisitsStateMock,
    status: initialStatusStateMock
});

const revisitMock = {
    ...revisitsMock[0],
    userId: authenticateStateMock.user.id
}

describe('Test useRevisits hook - loadLastRevisit', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should load last revisit successfully', async () => {
        RevisitsServiceSpy.getLastByUserId.mockResolvedValueOnce(revisitMock);

        const mockStore = authStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.loadLastRevisit();
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
            lastRevisit: revisitMock
        });
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = initialStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.loadLastRevisit();
        });

        /* Check if revisits state is equal to initial state */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });
});