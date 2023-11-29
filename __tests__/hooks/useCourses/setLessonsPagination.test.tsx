import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialCoursesStateMock, initialStatusStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook setLessonsPagination ', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should change lessons pagination', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            result.current.useCourses.setLessonsPagination({
                from: 19,
                to: 10
            });
        });

        /* Check if lessonsPagination is changed */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            lessonsPagination: {
                from: 19,
                to: 10
            }
        });

        await act(async () => {
            result.current.useCourses.setLessonsPagination({
                from: 0,
                to: 9
            });
        });

        /* Check if lessonsPagination is changed */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            lessonsPagination: {
                from: 0,
                to: 9
            }
        });
    });
});