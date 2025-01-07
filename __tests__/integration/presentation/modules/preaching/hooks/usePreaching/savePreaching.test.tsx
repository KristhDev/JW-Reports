import { act } from '@testing-library/react-native';

/* Setups */
import { mockUseNavigation } from '@test-setup';
import { getMockStoreUsePreaching, renderUsePreaching } from '@setups';

/* Mocks */
import {
    authenticatePrecursorMock,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialPreachingStateMock,
    initialStatusStateMock,
    PreachingServiceSpy,
    preachingsMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages, preachingMessages } from '@application/constants';

/* Errors */
import { RequestError } from '@domain/errors';

const initialMockStore = () => getMockStoreUsePreaching({
    auth: initialAuthStateMock,
    preaching: initialPreachingStateMock,
    status: initialStatusStateMock
});

const authMockStore = () => getMockStoreUsePreaching({
    auth: authenticatePrecursorMock,
    preaching: initialPreachingStateMock,
    status: initialStatusStateMock
});

const preachingMock = {
    ...preachingsMock[0],
    userId: authenticatePrecursorMock.user.id,
    day: new Date('2023-03-17').toString(),
    initHour: new Date('2023-03-03 13:00:00').toString(),
    finalHour: new Date('2023-03-03 13:00:00').toString()
}

describe('Test in usePreaching hook - savePreaching', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save preaching day successfully', async () => {
        PreachingServiceSpy.create.mockResolvedValueOnce(preachingMock);

        const mockStore = authMockStore();
        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.savePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            preachings: [{
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }]
        });

        expect(result.current.usePreaching.state.preachings).toHaveLength(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: preachingMessages.ADDED_SUCCESS
        });

        /* Check if goBack is called one time */
        expect(mockUseNavigation.goBack).toHaveBeenCalledTimes(1);
    });

    it('should faild if user isnt authenticated', async () => {
        const mockStore = initialMockStore();
        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.savePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date)
        });

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });

        /* Check if goBack is called one time */
        expect(mockUseNavigation.goBack).not.toHaveBeenCalled();
    });

    it('should faild if data is invalid', async () => {
        PreachingServiceSpy.create.mockRejectedValueOnce(new RequestError('Invalid date', 400, 'invalid_date'));

        const mockStore = authMockStore();
        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.savePreaching({
                day: new Date('invalid'),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date)
        });

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        /* Check if goBack isnt called */
        expect(mockUseNavigation.goBack).not.toHaveBeenCalled();
    });
});