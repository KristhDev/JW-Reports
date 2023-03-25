import { act } from '@testing-library/react-native';

import { initialState as authInitState } from '../../features/auth';
import { lessonsState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test useCourses hook removeLessons', () => {
    it('should remove all lessons of state', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: lessonsState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.removeLessons();
        });

        expect(result.current.useCourses.state).toEqual({
            ...lessonsState,
            lessons: []
        });
    });
});