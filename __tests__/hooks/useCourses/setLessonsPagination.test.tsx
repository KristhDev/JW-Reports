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

describe('Test useCourses hook setLessonsPagination ', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    it('should change lessons pagination', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.setLessonsPagination({
                from: 19,
                to: 10
            });
        });

        /* Check if lessonsPagination is changed */
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

        /* Check if lessonsPagination is changed */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            lessonsPagination: {
                from: 0,
                to: 9
            }
        });
    });
});