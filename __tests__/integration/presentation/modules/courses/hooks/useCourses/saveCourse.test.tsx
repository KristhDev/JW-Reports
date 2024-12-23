import { act } from '@testing-library/react-native';

/* Setups */
import { mockUseNavigation } from '@test-setup';
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    CoursesServiceSpy,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    onFinishMock,
    testCourse,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages, coursesMessages } from '@application/constants';

/* Errors */
import { RequestError } from '@domain/errors';

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

describe('Test in useCourses hook - saveCourse', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save course successfully', async () => {
        const mockStore = authMockStore();

        CoursesServiceSpy.create.mockResolvedValue({
            ...testCourse,
            id: '4707f771-396f-4133-a454-257bc77b55b1',
            userId: mockStore.getState().auth.user.id,
            finished: false,
            suspended: false,
            lastLesson: undefined,
            createdAt: '1734968345186',
            updatedAt: '1734968345186'
        });

        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse, onFinishMock);
        });

        /* Check if courses state contain new course added */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            courses: [{
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                lastLesson: undefined,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }]
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: coursesMessages.ADDED_SUCCESS
        });

        /* Check if onFinish and navigate is called one time with respective arg */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.popTo).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.popTo).toHaveBeenCalledWith('CoursesTopTabsNavigation');
    });

    it('should faild if user inst autenticated', async () => {
        const mockStore = intitialMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse, onFinishMock);
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });

        /* Check if onFinish called one time and popTo not called */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.popTo).not.toHaveBeenCalled();
    });

    it('should faild if data is invalid', async () => {
        CoursesServiceSpy.create.mockRejectedValue(new RequestError('Invalid data', 400, 'invalid_data'));

        const mockStore = authMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.saveCourse({
                ...testCourse,
                publication: undefined as any
            }, onFinishMock);
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String),
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.popTo).not.toHaveBeenCalled();
    });
});