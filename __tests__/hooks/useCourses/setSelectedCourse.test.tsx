import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Setup */
import { getMockStore, render } from './setup';

describe('Test useCourses hook setSelectedCourse', () => {
    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.setSelectedCourse({
                id: 'cd5c408b-8885-4293-a094-1d675308631f',
                person_name: 'Liam Cormier',
                user_id: 'e550c695-b1b3-486f-b7ac-32467fc7c473',
                person_about: 'Autem nulla ut veritatis omnis at minus itaque ab.',
                person_address: 'Repudiandae nisi voluptatem necessitatibus consequatur est hic nemo quia. Blanditiis nobis enim rerum reiciendis autem fugiat. Exercitationem alias minus dolorem quo. Molestias quia omnis. Quibusdam quis repellendus dignissimos amet excepturi odit eligendi ullam. Fugiat deleniti fuga totam eius.',
                publication: 'dolore sit totam',
                finished: false,
                suspended: true,
                created_at: '2023-03-20T00:00:00.000Z',
                updated_at: '2023-03-20T00:00:00.000Z'
            });
        });

        /* Check if selectedCourse is changed */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            selectedCourse: {
                id: 'cd5c408b-8885-4293-a094-1d675308631f',
                person_name: 'Liam Cormier',
                user_id: 'e550c695-b1b3-486f-b7ac-32467fc7c473',
                person_about: 'Autem nulla ut veritatis omnis at minus itaque ab.',
                person_address: 'Repudiandae nisi voluptatem necessitatibus consequatur est hic nemo quia. Blanditiis nobis enim rerum reiciendis autem fugiat. Exercitationem alias minus dolorem quo. Molestias quia omnis. Quibusdam quis repellendus dignissimos amet excepturi odit eligendi ullam. Fugiat deleniti fuga totam eius.',
                publication: 'dolore sit totam',
                finished: false,
                suspended: true,
                created_at: '2023-03-20T00:00:00.000Z',
                updated_at: '2023-03-20T00:00:00.000Z'
            }
        });
    });
});