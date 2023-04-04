import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test useCourses hook loadCourses', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should load courses successfully', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });


        await act(async () => {
            await result.current.useCourses.loadCourses({ filter: 'all' });
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            hasMoreCourses: false
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst authenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.loadCourses({ filter: 'all' });
        });

        expect(result.current.useCourses.state).toEqual(coursesInitState);
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });
});