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

jest.mock('../../../../../src/modules/shared/hooks/useNetwork.ts');

describe('Test in useLessons hook', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should return respective props', () => {
        const mockStore = getMockStoreUseLessons({
            auth: initialAuthStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseLessons(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.useLessons).toEqual({
            state: initialLessonsStateMock,

            clearLessons: expect.any(Function),
            removeLessons: expect.any(Function),
            setLessonsPagination: expect.any(Function),
            setSelectedLesson: expect.any(Function),

            deleteLesson: expect.any(Function),
            finishOrStartLesson: expect.any(Function),
            loadLastLesson: expect.any(Function),
            loadLessons: expect.any(Function),
            saveLesson: expect.any(Function),
            updateLesson: expect.any(Function)
        });
    });
});