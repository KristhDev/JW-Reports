import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseLessons, renderUseLessons } from '../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    wifiMock
} from '../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUseLessons({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useLessons hook - setLessonsPagination', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
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