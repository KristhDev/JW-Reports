import { act } from '@testing-library/react-native';

import { initialState as authInitState } from '../../features/auth';
import { coursesState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test useCourses hook removeCourses', () => {
    it('should remove all courses of state', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.removeCourses();
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesState,
            courses: []
        });
    });
});