import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { lessonsState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Setup */
import { getMockStore, render } from './setup';

describe('Test useCourses hook removeLessons', () => {
    it('should remove all lessons of state', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: lessonsState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.removeLessons();
        });

        /* Check if lessons is empty array in courses state */
        expect(result.current.useCourses.state).toEqual({
            ...lessonsState,
            lessons: []
        });
    });
});