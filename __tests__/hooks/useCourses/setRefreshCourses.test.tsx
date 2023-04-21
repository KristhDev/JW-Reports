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

describe('Test useCourses hook setRefreshCourses', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.setRefreshCourses(true);
        });

        /* Check if refreshCourses is changed */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            refreshCourses: true
        });

        await act(async () => {
            await result.current.useCourses.setRefreshCourses(false);
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual(coursesInitState);
    });
});