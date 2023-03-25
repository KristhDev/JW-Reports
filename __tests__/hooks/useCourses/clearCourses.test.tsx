import { act } from '@testing-library/react-native';

import { initialState as authInitState } from '../../features/auth';
import { initialState as coursesInitState, coursesState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test useCourses hook clearCourses', () => {
    it('should clear state', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.clearCourses();
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            selectedCourse: {
                ...coursesInitState.selectedCourse,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            selectedLesson: {
                ...coursesInitState.selectedLesson,
                next_lesson: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });
    });
});