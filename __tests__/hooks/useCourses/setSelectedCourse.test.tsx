import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialCoursesStateMock, initialStatusStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook setSelectedCourse', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

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