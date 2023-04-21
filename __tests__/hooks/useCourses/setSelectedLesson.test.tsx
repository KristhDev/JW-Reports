import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook setSelectedLesson', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.setSelectedLesson({
                id: 'cd5c408b-8885-4293-a094-1d675308631f',
                course_id: '252ba403-cd0f-458b-945e-5ecade34e4db',
                description: 'Omnis possimus beatae ab dolor necessitatibus voluptate repellendus atque nesciunt. Quae et odio quae.',
                done: false,
                next_lesson: '2023-03-20T00:00:00.000Z',
                created_at: '2023-03-20T00:00:00.000Z',
                updated_at: '2023-03-20T00:00:00.000Z'
            });
        });

        /* Check if selectedLesson is changed */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            selectedLesson: {
                id: 'cd5c408b-8885-4293-a094-1d675308631f',
                course_id: '252ba403-cd0f-458b-945e-5ecade34e4db',
                description: 'Omnis possimus beatae ab dolor necessitatibus voluptate repellendus atque nesciunt. Quae et odio quae.',
                done: false,
                next_lesson: '2023-03-20T00:00:00.000Z',
                created_at: '2023-03-20T00:00:00.000Z',
                updated_at: '2023-03-20T00:00:00.000Z'
            }
        });
    });
});