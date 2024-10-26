import { act } from '@testing-library/react-native';

/* Setups */
import { mockUseNavigation } from '@test-setup';
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    courseMock,
    CoursesServiceSpy,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    LessonsServiceSpy,
    onFinishMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Modules */
import { authMessages } from '@auth';
import { coursesMessages } from '@courses';

describe('Test in useCourses hook - deleteCourse', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseCourses({
            auth: authenticateStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should delete course successfully', async () => {
        CoursesServiceSpy.delete.mockImplementation(() => Promise.resolve());
        LessonsServiceSpy.deleteLessonsByCourseId.mockImplementation(() => Promise.resolve());

        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            result.current.useCourses.setSelectedCourse({ ...courseMock, userId: authenticateStateMock.user.id });
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse(true, onFinishMock);
        });

        /* Check is state contain selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                ...initialCoursesStateMock.selectedCourse,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: coursesMessages.DELETED_SUCCESS
        });

        /* Check if onFinish and navigate is called with respective arg */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('CoursesScreen');
    });

    it('should faild if user isnt authenticated', async () => {
        const mockStore = getMockStoreUseCourses({
            auth: initialAuthStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.deleteCourse(true, onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and if
         *  onFinish is called one time
         */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should faild if selectedCourse is empty', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.deleteCourse(true, onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and if
         *  onFinish is called one time
         */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: coursesMessages.UNSELECTED_DELETE
        });
    });
});