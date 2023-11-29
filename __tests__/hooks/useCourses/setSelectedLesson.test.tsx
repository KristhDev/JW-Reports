import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialCoursesStateMock, initialStatusStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook setSelectedLesson', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(() => {
            result.current.useCourses.setSelectedLesson({
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
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
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