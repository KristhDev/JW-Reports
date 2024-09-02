import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUsePreaching, renderUsePreaching } from '@setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialStatusStateMock,
    initialPreachingStateMock,
    preachingsStateMock,
    wifiMock
} from '@mocks';

describe('Test usePreaching hook - clearPreaching', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    let mockStore = {} as any;

    beforeEach(() => {
        mockStore = getMockStoreUsePreaching({
            auth: initialAuthStateMock,
            status: initialStatusStateMock,
            preaching: preachingsStateMock
        });
    });

    it('should clear state', async () => {
        const { result } = renderUsePreaching(mockStore);

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual(preachingsStateMock);

        await act(() => {
            result.current.usePreaching.clearPreaching();
        });

        /* Check if state is equal to initial state */
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
});