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
    testCredentials,
    testRevisit,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Errors */
import { RequestError } from '@domain/errors';

/* Modules */
import { authMessages } from '@auth';
import { revisitsMessages } from '@revisits';

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
    ...testRevisit,
    userId: authenticateStateMock.user.id,
    nextVisit: testRevisit.nextVisit.toISOString(),
}

const revisitUpdateMock = {
    ...revisitsMock[0],
    ...testRevisit,
    userId: authenticateStateMock.user.id,
    personName: 'Chris Frami',
    nextVisit: testRevisit.nextVisit.toISOString(),
}

describe('Test useRevisits hook - updateRevisit', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update revisit successfully', async () => {
        RevisitsServiceSpy.update.mockResolvedValueOnce(revisitUpdateMock);
        RevisitsServiceSpy.getLastByUserId.mockResolvedValueOnce(revisitUpdateMock);

        const mockStore = authStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: true,
                onFinish: onFinishMock,
                image: null,
                revisitValues: testRevisit
            });
        });

        await act(async () => {
            result.current.useRevisits.setSelectedRevisit(revisitMock);
        });

        await act(async () => {
            await result.current.useRevisits.updateRevisit({ ...testRevisit, personName: 'Chris Frami' }, null);
        });

        /* Check if revisits and selectedRevisit is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            selectedRevisit: revisitUpdateMock,
            lastRevisit: revisitUpdateMock
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: revisitsMessages.UPDATED_SUCCESS
        });

        /* Check if goBack is called one time */
        expect(mockUseNavigation.goBack).toHaveBeenCalledTimes(1);
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = initialStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.updateRevisit(testRevisit, null);
        });

        /* Check if revisits state inst changed */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);

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
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.updateRevisit(testRevisit, null);
        });

        /* Check if revisits state inst changed */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: revisitsMessages.UNSELECTED_UPDATE
        });
    });

    it('should faild if data is invalid', async () => {
        RevisitsServiceSpy.update.mockRejectedValueOnce(new RequestError('Invalid revisit', 400, 'invalid_revisit'));

        const mockStore = authStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            result.current.useRevisits.setSelectedRevisit(revisitMock);
        });

        await act(async () => {
            await result.current.useRevisits.updateRevisit({ ...testRevisit, nextVisit: new Date('invalid') }, null);
        });

        /* Check if revisits and selectedRevisits inst updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            selectedRevisit: revisitMock,
            lastRevisit: {
                ...initialRevisitsStateMock.lastRevisit,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        /* Check if goBack inst called */
        expect(mockUseNavigation.goBack).not.toHaveBeenCalled();
    });
});