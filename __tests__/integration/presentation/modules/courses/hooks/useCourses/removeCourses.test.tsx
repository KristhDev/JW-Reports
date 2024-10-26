import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    coursesStateMock,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

const mockStore = getMockStoreUseCourses({
    auth: initialAuthStateMock,
    courses: coursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useCourses hook - removeCourses', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should remove all courses of state', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            result.current.useCourses.removeCourses();
        });

        /* Check if courses is empty array in courses state */
        expect(result.current.useCourses.state).toEqual({
            ...coursesStateMock,
            courses: []
        });
    });
});