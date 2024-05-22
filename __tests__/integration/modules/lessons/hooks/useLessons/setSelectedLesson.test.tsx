import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '../../../../../../jest.setup';
import { getMockStoreUseLessons, renderUseLessons } from '../../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    wifiMock
} from '../../../../../mocks';

const mockStore = getMockStoreUseLessons({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useLessons hook - setSelectedLesson', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }));

    it('should change respective property', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(() => {
            result.current.useLessons.setSelectedLesson({
                id: 'cd5c408b-8885-4293-a094-1d675308631f',
                courseId: '252ba403-cd0f-458b-945e-5ecade34e4db',
                description: 'Omnis possimus beatae ab dolor necessitatibus voluptate repellendus atque nesciunt. Quae et odio quae.',
                done: false,
                nextLesson: '2023-03-20T00:00:00.000Z',
                createdAt: '2023-03-20T00:00:00.000Z',
                updatedAt: '2023-03-20T00:00:00.000Z'
            });
        });

        /* Check if selectedLesson is changed */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            selectedLesson: {
                id: 'cd5c408b-8885-4293-a094-1d675308631f',
                courseId: '252ba403-cd0f-458b-945e-5ecade34e4db',
                description: 'Omnis possimus beatae ab dolor necessitatibus voluptate repellendus atque nesciunt. Quae et odio quae.',
                done: false,
                nextLesson: '2023-03-20T00:00:00.000Z',
                createdAt: '2023-03-20T00:00:00.000Z',
                updatedAt: '2023-03-20T00:00:00.000Z'
            }
        });
    });
});