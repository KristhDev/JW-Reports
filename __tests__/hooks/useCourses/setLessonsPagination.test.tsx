import { act } from '@testing-library/react-native';

import { initialState as authInitState } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test useCourses hook setLessonsPagination ', () => {
    it('should change lessons pagination', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.setLessonsPagination({
                from: 19,
                to: 10
            });
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            lessonsPagination: {
                from: 19,
                to: 10
            }
        });

        await act(async () => {
            await result.current.useCourses.setLessonsPagination({
                from: 0,
                to: 9
            });
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            lessonsPagination: {
                from: 0,
                to: 9
            }
        });
    });
});