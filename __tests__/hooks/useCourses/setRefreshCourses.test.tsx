import { act } from '@testing-library/react-native';

import { initialState as authInitState } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test useCourses hook setRefreshCourses', () => {
    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.setRefreshCourses(true);
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            refreshCourses: true
        });

        await act(async () => {
            await result.current.useCourses.setRefreshCourses(false);
        });

        expect(result.current.useCourses.state).toEqual(coursesInitState);
    });
});