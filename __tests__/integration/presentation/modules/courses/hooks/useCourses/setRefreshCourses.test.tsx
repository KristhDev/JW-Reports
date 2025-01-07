import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

const mockStore = getMockStoreUseCourses({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useCourses hook - setRefreshCourses', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should change respective property', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(() => {
            result.current.useCourses.setRefreshCourses(true);
        });

        /* Check if refreshCourses is changed */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            refreshCourses: true
        });

        await act(() => {
            result.current.useCourses.setRefreshCourses(false);
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
    });
});