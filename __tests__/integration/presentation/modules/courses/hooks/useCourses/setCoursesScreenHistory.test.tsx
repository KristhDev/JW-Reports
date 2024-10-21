import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
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