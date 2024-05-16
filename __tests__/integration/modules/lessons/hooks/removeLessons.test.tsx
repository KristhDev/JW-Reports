import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseLessons, renderUseLessons } from '../../../../setups';

/* Mocks */
import {
    courseSelectedStateMock,
    initialAuthStateMock,
    initialStatusStateMock,
    lessonsStateMock,
    wifiMock
} from '../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/lessons/hooks/useLessons.ts');

const mockStore = getMockStoreUseLessons({
    auth: initialAuthStateMock,
    courses: courseSelectedStateMock,
    lessons: lessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useLessons hook - removeLessons', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should remove all lessons of state', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(() => {
            result.current.useLessons.removeLessons();
        });

        /* Check if lessons is empty array in courses state */
        expect(result.current.useLessons.state).toEqual({
            ...lessonsStateMock,
            lessons: []
        });
    });
});