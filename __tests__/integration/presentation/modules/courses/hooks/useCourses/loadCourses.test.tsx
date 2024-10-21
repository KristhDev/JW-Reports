import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    coursesMock,
    CoursesServiceSpy,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    wifiMock
} from '@mocks';

/* Modules */
import { authMessages } from '@auth';

const intitialMockStore = () => getMockStoreUseCourses({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

const authMockStore = () => getMockStoreUseCourses({
    auth: authenticateStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useCourses hook - loadCourses', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should load courses successfully', async () => {
        CoursesServiceSpy.getAllByUserId.mockResolvedValue(coursesMock);

        const mockStore = authMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.loadCourses({ filter: 'all' });
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            courses: expect.any(Array),
            hasMoreCourses: false
        });

        result.current.useCourses.state.courses.forEach((course) => {
            expect(course).toEqual({
                id: expect.any(String),
                userId: expect.any(String),
                personName: expect.any(String),
                personAbout: expect.any(String),
                personAddress: expect.any(String),
                publication: expect.any(String),
                lastLesson: expect.any(Object),
                suspended: expect.any(Boolean),
                finished: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        })
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = intitialMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.loadCourses({ filter: 'all' });
        });

        /**
         * Check if courses state is equal to initial state and status
         * state is equal to respective status
         */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });
});