import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    courseMock,
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

describe('Test in useCourses hook - setSelectedCourse', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should change respective property', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(() => {
            result.current.useCourses.setSelectedCourse(courseMock);
        });

        /* Check if selectedCourse is changed */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: courseMock
        });
    });
});