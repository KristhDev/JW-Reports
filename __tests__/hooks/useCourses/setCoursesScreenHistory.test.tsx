import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialCoursesStateMock, initialStatusStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook setCoursesScreenHistory ', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should add screen of courses history', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(() => {
            result.current.useCourses.setCoursesScreenHistory('AllCoursesScreen');
        });

        /* Check if coursesScreenHistory is changed */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            coursesScreenHistory: [ 'AllCoursesScreen' ]
        });

        await act(() => {
            result.current.useCourses.setCoursesScreenHistory('CompleteCoursesScreen');
        });

        /* Check if coursesScreenHistory is changed */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            coursesScreenHistory: [ 'AllCoursesScreen', 'CompleteCoursesScreen' ]
        });
    });
});