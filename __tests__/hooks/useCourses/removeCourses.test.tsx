import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { coursesState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Setup */
import { getMockStore, render } from './setup';

describe('Test useCourses hook removeCourses', () => {
    it('should remove all courses of state', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.removeCourses();
        });

        /* Check if courses is empty array in courses state */
        expect(result.current.useCourses.state).toEqual({
            ...coursesState,
            courses: []
        });
    });
});