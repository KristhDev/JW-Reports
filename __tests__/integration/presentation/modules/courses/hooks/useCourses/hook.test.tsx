/* Setups */
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

describe('Test useCourses hook', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should return respective props', () => {
        const { result } = renderUseCourses(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.useCourses).toEqual({
            state: initialCoursesStateMock,

            clearCourses: expect.any(Function),
            removeCourses: expect.any(Function),
            setCoursesPagination: expect.any(Function),
            setCoursesScreenHistory: expect.any(Function),
            setRefreshCourses: expect.any(Function),
            setSelectedCourse: expect.any(Function),

            activeOrSuspendCourse: expect.any(Function),
            deleteCourse: expect.any(Function),
            exportCourses: expect.any(Function),
            finishOrStartCourse: expect.any(Function),
            loadCourses: expect.any(Function),
            saveCourse: expect.any(Function),
            updateCourse: expect.any(Function),
        });
    });
});