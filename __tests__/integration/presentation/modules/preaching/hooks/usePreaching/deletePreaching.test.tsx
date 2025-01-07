import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUsePreaching, renderUsePreaching } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialPreachingStateMock,
    initialStatusStateMock,
    onFinishMock,
    preachingSelectedStateMock,
    PreachingServiceSpy,
    preachingsMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages, preachingMessages } from '@application/constants';

const preachingMock = {
    ...preachingsMock[0],
    userId: authenticateStateMock.user.id
}

const initialMockStore = getMockStoreUsePreaching({
    auth: initialAuthStateMock,
    preaching: initialPreachingStateMock,
    status: initialStatusStateMock
});

const mockStoreWithCurrentSelectedDate = getMockStoreUsePreaching({
    auth: authenticateStateMock,
    preaching: {
        ...initialPreachingStateMock,
        selectedDate: new Date()
    },
    status: initialStatusStateMock
});

describe('Test usePreaching hook - deletePreaching', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    let mockStorePreachingSelected = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStorePreachingSelected = getMockStoreUsePreaching({
            auth: authenticateStateMock,
            preaching: preachingSelectedStateMock,
            status: initialStatusStateMock
        });
    });

    it('should delete preaching day successfully', async () => {
        PreachingServiceSpy.delete.mockImplementationOnce(() => Promise.resolve());
        const { result } = renderUsePreaching(mockStoreWithCurrentSelectedDate);

        await act(async () => {
            result.current.usePreaching.setSelectedPreaching({
                ...preachingMock,
                day: new Date().toISOString(),
                initHour: new Date().toISOString(),
                finalHour: new Date().toISOString()
            });
        });

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...initialPreachingStateMock.seletedPreaching,
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
            msg: preachingMessages.DELETED_SUCCESS
        });
    });

    it('should faild if selectedPreaching is empty', async () => {
        const { result } = renderUsePreaching(mockStoreWithCurrentSelectedDate);

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: preachingMessages.UNSELECTED_DELETE
        });

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...initialPreachingStateMock.seletedPreaching,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });

    it('should faild if user is unauthenticated', async () => {
        const { result } = renderUsePreaching(initialMockStore);

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...initialPreachingStateMock.seletedPreaching,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });

    it('should faild if preaching day does not belong to user', async () => {
        const { result } = renderUsePreaching(mockStorePreachingSelected);

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: authMessages.UNAUTHORIZED
        });

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual({
            ...preachingSelectedStateMock,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...preachingSelectedStateMock.seletedPreaching,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });
});