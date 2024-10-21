import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseLessons, renderUseLessons } from '@setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    wifiMock
} from '@mocks';

describe('Test in useLessons hook - setLessonsPagination', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        mockStore = getMockStoreUseLessons({
            auth: initialAuthStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should change lessons pagination', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            result.current.useLessons.setLessonsPagination({ from: 19, to: 10 });
        });

        /* Check if lessonsPagination is changed */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            lessonsPagination: { from: 19, to: 10 }
        });

        await act(async () => {
            result.current.useLessons.setLessonsPagination({ from: 0, to: 9 });
        });

        /* Check if lessonsPagination is changed */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            lessonsPagination: { from: 0, to: 9 }
        });
    });
});