import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
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
    wifiMock
} from '@mocks';

/* Modules */
import { authMessages } from '@auth';

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

describe('Test usePreaching hook - loadPreachings', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should load preachings day successfully', async () => {
        PreachingServiceSpy.getByUserIdAndMonth.mockResolvedValue(preachingsMock);

        const mockStore = authMockStore();
        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.loadPreachings(new Date());
        });

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            preachings: expect.any(Array),
            seletedPreaching: {
                id: '',
                userId: '',
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        result.current.usePreaching.state.preachings.forEach((preaching) => {
            expect(preaching).toEqual({
                id: expect.any(String),
                userId: expect.any(String),
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        });
    });

    it('should faild if user is unauthenticated', async () => {
        const mockStore = initialMockStore();
        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.loadPreachings(new Date());
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual(initialPreachingStateMock);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });
});