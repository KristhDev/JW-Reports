import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook setCoursesPagination', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    it('should change courses pagination', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.setCoursesPagination({
                from: 10,
                to: 19
            });
        });

        /* Check if courses state contain coursesPagination, selectedCourse and selectedLesson */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            coursesPagination: {
                from: 10,
                to: 19
            },
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

        await act(async () => {
            await result.current.useCourses.setCoursesPagination({
                from: 0,
                to: 9
            });
        });

        /* Check if courses state contain coursesPagination, selectedCourse and selectedLesson */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            coursesPagination: {
                from: 0,
                to: 9
            },
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