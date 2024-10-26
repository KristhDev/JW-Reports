import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseLessons, renderUseLessons } from '@setups';

/* Mocks */
import {
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    lessonMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

const mockStore = getMockStoreUseLessons({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useLessons hook - setSelectedLesson', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    it('should change respective property', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(() => {
            result.current.useLessons.setSelectedLesson(lessonMock);
        });

        /* Check if selectedLesson is changed */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            selectedLesson: lessonMock
        });
    });
});