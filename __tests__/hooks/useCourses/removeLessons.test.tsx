import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialStatusStateMock, lessonsStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook removeLessons', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should remove all lessons of state', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: lessonsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(() => {
            result.current.useCourses.removeLessons();
        });

        /* Check if lessons is empty array in courses state */
        expect(result.current.useCourses.state).toEqual({
            ...lessonsStateMock,
            lessons: []
        });
    });
});