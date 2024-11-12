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

describe('Test in useCourses hook - updateCourse', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update course successfully', async () => {
        CoursesServiceSpy.update.mockResolvedValue({ ...courseMock, ...testCourse, personName: 'Alvah Simonis' });

        const mockStore = authMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            result.current.useCourses.setSelectedCourse(courseMock);
        });

        await act(async () => {
            await result.current.useCourses.updateCourse({
                ...testCourse,
                personName: 'Alvah Simonis'
            });
        });

        /* Check if selectedCourse and courses are updated */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                ...result.current.useCourses.state.selectedCourse,
                ...testCourse,
                personName: 'Alvah Simonis',
                lastLesson: undefined,
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: coursesMessages.UPDATED_SUCCESS
        });

        /* Check if goBack is called one time */
        expect(mockUseNavigation.goBack).toHaveBeenCalledTimes(1);
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = intitialMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.updateCourse({
                ...testCourse,
                personName: 'Alvah Simonis'
            });
        });

        /* Check if courses state inst changed */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should faild if selectedCourse is empty', async () => {
        const mockStore = authMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.updateCourse({
                ...testCourse,
                personName: 'Alvah Simonis'
            });
        });

        /* Check if courses state contain courses */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: coursesMessages.UNSELECTED_UPDATE
        });
    });

    it('should faild if data is invalid', async () => {
        CoursesServiceSpy.update.mockRejectedValue(new RequestError('Invalid data', 400, 'invalid_data'));

        const mockStore = authMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            result.current.useCourses.setSelectedCourse(courseMock);
        });

        await act(async () => {
            await result.current.useCourses.updateCourse({
                ...testCourse,
                personName: undefined as any,
            });
        });

        /* Check if courses state contain selectedCourse and courses */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: courseMock
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });
    });
});