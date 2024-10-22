import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseLessons, renderUseLessons } from '@setups';

/* Mocks */
import {
    courseSelectedStateMock,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialStatusStateMock,
    lessonsStateMock,
    wifiMock
} from '@mocks';

const mockStore = getMockStoreUseLessons({
    auth: initialAuthStateMock,
    courses: courseSelectedStateMock,
    lessons: lessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useLessons hook - removeLessons', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should remove all lessons of state', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(() => {
            result.current.useLessons.removeLessons();
        });

        /* Check if lessons is empty array in courses state */
        expect(result.current.useLessons.state).toEqual({
            ...lessonsStateMock,
            lessons: []
        });
    });
});