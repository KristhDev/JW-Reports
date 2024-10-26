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

describe('Test in useCourses hook - setCoursesScreenHistory ', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should add screen of courses history', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(() => {
            result.current.useCourses.setCoursesScreenHistory('AllCoursesScreen');
        });

        /* Check if coursesScreenHistory is changed */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            coursesScreenHistory: [ 'AllCoursesScreen' ]
        });

        await act(() => {
            result.current.useCourses.setCoursesScreenHistory('CompleteCoursesScreen');
        });

        /* Check if coursesScreenHistory is changed */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            coursesScreenHistory: [ 'AllCoursesScreen', 'CompleteCoursesScreen' ]
        });
    });
});