import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    coursesStateMock,
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
    courses: coursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useCourses hook - clearCourses', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should clear state', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(() => {
            result.current.useCourses.clearCourses();
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                ...initialCoursesStateMock.selectedCourse,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });
});