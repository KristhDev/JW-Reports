import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialCoursesStateMock, initialStatusStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook setRefreshCourses', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(() => {
            result.current.useCourses.setRefreshCourses(true);
        });

        /* Check if refreshCourses is changed */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            refreshCourses: true
        });

        await act(() => {
            result.current.useCourses.setRefreshCourses(false);
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
    });
});