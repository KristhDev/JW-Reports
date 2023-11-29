import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { coursesStateMock, initialAuthStateMock, initialStatusStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook removeCourses', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should remove all courses of state', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: coursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            result.current.useCourses.removeCourses();
        });

        /* Check if courses is empty array in courses state */
        expect(result.current.useCourses.state).toEqual({
            ...coursesStateMock,
            courses: []
        });
    });
});