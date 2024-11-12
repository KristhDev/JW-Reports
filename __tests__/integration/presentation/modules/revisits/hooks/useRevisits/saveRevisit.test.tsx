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
    testRevisit,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages, revisitsMessages } from '@application/constants';

/* Errors */
import { RequestError } from '@domain/errors';

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

describe('Test useRevisits hook - saveRevisit', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save revisit successfully', async () => {
        RevisitsServiceSpy.create.mockResolvedValue(revisitMock);
        RevisitsServiceSpy.getLastByUserId.mockResolvedValue(revisitMock);

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

        /* Check if revisits state contain new revisit */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisits: [ revisitMock ],
            lastRevisit: revisitMock
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: revisitsMessages.ADDED_SUCCESS
        });

        /* Check if onFinish and navigate is called one time with respective arg */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('RevisitsTopTabsNavigation');
    });

    it('should show other message when back is false', async () => {
        RevisitsServiceSpy.create.mockResolvedValue(revisitMock);
        RevisitsServiceSpy.getLastByUserId.mockResolvedValue(revisitMock);

        const mockStore = authStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: false,
                onFinish: onFinishMock,
                image: null,
                revisitValues: testRevisit
            });
        });

        /* Check if revisits state contain new revisit */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisits: [ revisitMock ],
            lastRevisit: revisitMock
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: `Has agregado correctamente a ${ testRevisit.personName } para volverla a visitar.`
        });

        /* Check if onFinish is called one time and navigate inst called */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).not.toHaveBeenCalled();
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = initialStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: true,
                onFinish: onFinishMock,
                image: null,
                revisitValues: testRevisit
            });
        });

        /* Check if revisits state is equal to initial state */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
    });

    it('should faild if data is invalid', async () => {
        RevisitsServiceSpy.create.mockRejectedValueOnce(new RequestError('Invalid revisit', 400, 'invalid_revisit'));

        const mockStore = authStoreMock();
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: true,
                image: null,
                onFinish: onFinishMock,
                revisitValues: {
                    ...testRevisit,
                    nextVisit: new Date('invalid')
                }
            });
        });

        /* Check if revisits state is equal to initial state */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
    });
});