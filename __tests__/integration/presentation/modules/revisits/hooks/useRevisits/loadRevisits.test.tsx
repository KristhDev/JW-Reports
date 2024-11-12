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
})

const authStoreMock = () => getMockStoreUseRevisits({
    auth: authenticateStateMock,
    revisits: initialRevisitsStateMock,
    status: initialStatusStateMock
});

describe('Test in useRevisits hook - loadRevisits', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should load revisits successfully', async () => {
        RevisitsServiceSpy.getAllByUserId.mockResolvedValueOnce(revisitsMock);

        const mockStore = authStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.loadRevisits({ filter: 'all' });
        });

        /* Check if hasMoreRevisits is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisits: expect.any(Array),
            hasMoreRevisits: revisitsMock.length >= 10,
            revisitsPagination: {
                from: (revisitsMock.length >= 10) ? 10 : 0,
                to: (revisitsMock.length >= 10) ? 19 : 9
            }
        });

        result.current.useRevisits.state.revisits.forEach((revisit) => {
            expect(revisit).toEqual({
                id: expect.any(String),
                userId: expect.any(String),
                personName: expect.any(String),
                about: expect.any(String),
                address: expect.any(String),
                done: expect.any(Boolean),
                nextVisit: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = initialStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.loadRevisits({ filter: 'visited' });
        });

        /* Check if revisitFilter is changed */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisitFilter: 'visited'
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });
});