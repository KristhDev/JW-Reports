import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, onFinishMock, render, testCourse } from './setup';
import { navigateMock } from '../../../jest.setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook saveCourse', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save course successfully', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse, onFinishMock);
        });

        /* Check if courses state contain new course added */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            courses: [{
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }]
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: 'Haz agregado un curso correctamente.'
        });

        /* Check if onFinish and navigate is called one time with respective arg */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith({
            name: 'CoursesStackNavigation',
            params: {
                screen: 'CoursesTopTabsNavigation'
            }
        });

        await act(async () => {
            await result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst autenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse, onFinishMock);
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual(coursesInitState);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });

        /* Check if onFinish called one time and navigate not called */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).not.toHaveBeenCalled();
    });

    it('should fail when data is invalid', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

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
        expect(result.current.useCourses.state).toEqual(coursesInitState);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String),
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).not.toHaveBeenCalled();

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});