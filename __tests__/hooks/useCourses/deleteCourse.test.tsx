import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, onFinishMock, render, testCourse } from './setup';
import { navigateMock } from '../../../jest.setup';

describe('Test useCourses hook deleteCourse', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete course successfully', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse, onFinishMock);
        });

        await act(async () => {
            await result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse(true, onFinishMock);
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            selectedCourse: {
                ...coursesInitState.selectedCourse,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz eliminado el curso correctamente.'
        });

        expect(onFinishMock).toHaveBeenCalledTimes(2);
        expect(navigateMock).toHaveBeenCalledTimes(2);
        expect(navigateMock).toHaveBeenCalledWith('CoursesScreen');

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user isnt authenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.deleteCourse(true, onFinishMock);
        });

        expect(result.current.useCourses.state).toEqual(coursesInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

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
            await result.current.useCourses.deleteCourse(true, onFinishMock);
        });

        expect(result.current.useCourses.state).toEqual(coursesInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay un curso seleccionado para eliminar.'
        });
    });
});