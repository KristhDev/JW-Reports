import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render, testCourse } from './setup';
import { goBackMock } from '../../../jest.setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook updateCourse', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update course successfully', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(async () => {
            await result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.updateCourse({
                ...testCourse,
                person_name: 'Alvah Simonis'
            });
        });

        /* Check if selectedCourse and courses are updated */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            selectedCourse: {
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                person_name: 'Alvah Simonis',
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            courses: [{
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                person_name: 'Alvah Simonis',
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }]
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz actualizado el curso correctamente.'
        });

        /* Check if goBack is called one time */
        expect(goBackMock).toHaveBeenCalledTimes(1);

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst authenticate', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.updateCourse({
                ...testCourse,
                person_name: 'Alvah Simonis'
            });
        });

        /* Check if courses state inst changed */
        expect(result.current.useCourses.state).toEqual(coursesInitState);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should fail when selectedCourse is empty', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(async () => {
            await result.current.useCourses.updateCourse({
                ...testCourse,
                person_name: 'Alvah Simonis'
            });
        });

        /* Check if courses state contain courses */
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
            code: 400,
            msg: 'No hay un curso seleccionado para actualizar.'
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

    it('should fail when data is invalid', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(async () => {
            await result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.updateCourse({
                ...testCourse,
                person_name: undefined as any,
            });
        });

        /* Check if courses state contain selectedCourse and courses */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            selectedCourse: {
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
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
            code: expect.any(Number),
            msg: expect.any(String)
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});