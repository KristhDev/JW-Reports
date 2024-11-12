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

describe('Test in usePreaching hook - updatePreaching', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update preaching day successfully', async () => {
        PreachingServiceSpy.update.mockResolvedValueOnce(preachingMock);

        const mockStore = authMockStore();
        const { result } = renderUsePreaching(mockStore);

        await act(() => {
            result.current.usePreaching.setSelectedPreaching(preachingMock);
        });

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...result.current.usePreaching.state.seletedPreaching,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: preachingMessages.UPDATED_SUCCESS
        });

        /* Check if goBack is called two times */
        expect(mockUseNavigation.goBack).toHaveBeenCalledTimes(1);
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = initialMockStore();
        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
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
    });

    it('should faild if selectedPreaching is empty', async () => {
        const mockStore = authMockStore();
        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
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
            code: 400,
            msg: preachingMessages.UNSELECTED_UPDATE
        });
    });
});