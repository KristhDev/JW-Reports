import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseLessons, renderUseLessons } from '../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    testCourse,
    testCredentials,
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

describe('Test in useLessons hook - loadLessons', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should load lessons successfully', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(() => {
            result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        /* Check lessons state */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            hasMoreLessons: false
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user inst authenticated', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        /* Check if lessons state is equal to initial state and status state is equal to respective status */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should faild when selectedCourse is empty', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        /* Check if lessons state is equal to initial state and status state is equal to respective status */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay un curso seleccionado.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});