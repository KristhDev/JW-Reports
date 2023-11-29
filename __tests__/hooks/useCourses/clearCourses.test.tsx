import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { coursesStateMock, initialAuthStateMock, initialCoursesStateMock, initialStatusStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook clearCourses', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock,
    });

    it('should clear state', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: coursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(() => {
            result.current.useCourses.clearCourses();
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                ...initialCoursesStateMock.selectedCourse,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            selectedLesson: {
                ...initialCoursesStateMock.selectedLesson,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastLesson: {
                ...initialCoursesStateMock.lastLesson,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });
});