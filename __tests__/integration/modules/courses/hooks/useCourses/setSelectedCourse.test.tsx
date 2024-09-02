import { act } from '@testing-library/react-native';

/* Setup */
import { useNetworkSpy } from '@test-setup';
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    wifiMock
} from '@mocks';

const mockStore = getMockStoreUseCourses({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useCourses hook - setSelectedCourse', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }));

    it('should change respective property', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(() => {
            result.current.useCourses.setSelectedCourse({
                id: 'cd5c408b-8885-4293-a094-1d675308631f',
                personName: 'Liam Cormier',
                userId: 'e550c695-b1b3-486f-b7ac-32467fc7c473',
                personAbout: 'Autem nulla ut veritatis omnis at minus itaque ab.',
                personAddress: 'Repudiandae nisi voluptatem necessitatibus consequatur est hic nemo quia. Blanditiis nobis enim rerum reiciendis autem fugiat. Exercitationem alias minus dolorem quo. Molestias quia omnis. Quibusdam quis repellendus dignissimos amet excepturi odit eligendi ullam. Fugiat deleniti fuga totam eius.',
                publication: 'dolore sit totam',
                finished: false,
                suspended: true,
                createdAt: '2023-03-20T00:00:00.000Z',
                updatedAt: '2023-03-20T00:00:00.000Z'
            });
        });

        /* Check if selectedCourse is changed */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                id: 'cd5c408b-8885-4293-a094-1d675308631f',
                personName: 'Liam Cormier',
                userId: 'e550c695-b1b3-486f-b7ac-32467fc7c473',
                personAbout: 'Autem nulla ut veritatis omnis at minus itaque ab.',
                personAddress: 'Repudiandae nisi voluptatem necessitatibus consequatur est hic nemo quia. Blanditiis nobis enim rerum reiciendis autem fugiat. Exercitationem alias minus dolorem quo. Molestias quia omnis. Quibusdam quis repellendus dignissimos amet excepturi odit eligendi ullam. Fugiat deleniti fuga totam eius.',
                publication: 'dolore sit totam',
                finished: false,
                suspended: true,
                createdAt: '2023-03-20T00:00:00.000Z',
                updatedAt: '2023-03-20T00:00:00.000Z'
            }
        });
    });
});