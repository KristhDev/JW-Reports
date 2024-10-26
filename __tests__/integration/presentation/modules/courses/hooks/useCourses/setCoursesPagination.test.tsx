import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

const mockStore = getMockStoreUseCourses({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useCourses hook - setCoursesPagination', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should change courses pagination', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            result.current.useCourses.setCoursesPagination({ from: 10, to: 19 });
        });

        /* Check if courses state contain coursesPagination, selectedCourse and selectedLesson */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            coursesPagination: { from: 10, to: 19 },
            selectedCourse: {
                ...initialCoursesStateMock.selectedCourse,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
        });

        await act(() => {
            result.current.useCourses.setCoursesPagination({ from: 0, to: 9 });
        });

        /* Check if courses state contain coursesPagination, selectedCourse and selectedLesson */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            coursesPagination: { from: 0, to: 9 },
            selectedCourse: {
                ...initialCoursesStateMock.selectedCourse,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });
});