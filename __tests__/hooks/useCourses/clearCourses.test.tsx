import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { initialState as coursesInitState, coursesState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook clearCourses', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    it('should clear state', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.clearCourses();
        });

        /* Check if courses state is equal to initial state */
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