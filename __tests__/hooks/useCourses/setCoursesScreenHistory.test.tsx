import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Setup */
import { getMockStore, render } from './setup';

describe('Test useCourses hook setCoursesScreenHistory ', () => {
    it('should add screen of courses history', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.setCoursesScreenHistory('AllCoursesScreen');
        });

        /* Check if coursesScreenHistory is changed */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            coursesScreenHistory: [ 'AllCoursesScreen' ]
        });

        await act(async () => {
            await result.current.useCourses.setCoursesScreenHistory('CompleteCoursesScreen');
        });

        /* Check if coursesScreenHistory is changed */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            coursesScreenHistory: [ 'AllCoursesScreen', 'CompleteCoursesScreen' ]
        });
    });
});