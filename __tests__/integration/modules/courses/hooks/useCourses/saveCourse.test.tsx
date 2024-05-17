import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, mockUseNavigation } from '../../../../../../jest.setup';
import { getMockStoreUseCourses, renderUseCourses } from '../../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    testCourse,
    testCredentials,
    wifiMock
} from '../../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUseCourses({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useCourses hook - saveCourse', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save course successfully', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

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
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }]
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: 'Has agregado un curso correctamente.'
        });

        /* Check if onFinish and navigate is called one time with respective arg */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith({
            name: 'CoursesStackNavigation',
            params: {
                screen: 'CoursesTopTabsNavigation'
            }
        });

        await act(() => {
            result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user inst autenticated', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse, onFinishMock);
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });

        /* Check if onFinish called one time and navigate not called */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).not.toHaveBeenCalled();
    });

    it('should faild when data is invalid', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

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
        expect(mockUseNavigation.navigate).not.toHaveBeenCalled();

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});