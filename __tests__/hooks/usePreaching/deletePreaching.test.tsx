import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { coursesState } from '../../features/courses';
import { initialState as preachingInitState, preachingSelectedState } from '../../features/preaching';
import { revisitsState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

import { getMockStoreComplete, onFinishMock, render } from './setup';

describe('Test usePreaching hook deletePreaching', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete preaching day successfully', async () => {
        const mockStore = getMockStoreComplete({
            auth: authInitState,
            courses: coursesState,
            preaching: preachingInitState,
            revisits: revisitsState,
            status: statusInitState
        });

        const { result } = render(mockStore);


        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.savePreaching({
                day: new Date(),
                init_hour: new Date(),
                final_hour: new Date(),
                publications: 2,
                revisits: 0,
                videos: 0
            });

            await result.current.usePreaching.setSelectedPreaching(result.current.usePreaching.state.preachings[0]);
        });

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.usePreaching.state).toEqual({
            ...preachingInitState,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...preachingInitState.seletedPreaching,
                day: expect.any(String),
                init_hour: expect.any(String),
                final_hour: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz eliminado tu día de predicación correctamente.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when selectedPreaching is empty', async () => {
        const mockStore = getMockStoreComplete({
            auth: authInitState,
            courses: coursesState,
            preaching: preachingInitState,
            revisits: revisitsState,
            status: statusInitState
        });

        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay un día de predicación seleccionado para eliminar.'
        });

        expect(result.current.usePreaching.state).toEqual({
            ...preachingInitState,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...preachingInitState.seletedPreaching,
                day: expect.any(String),
                init_hour: expect.any(String),
                final_hour: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user is unauthenticated', async () => {
        const mockStore = getMockStoreComplete({
            auth: authInitState,
            courses: coursesState,
            preaching: preachingSelectedState,
            revisits: revisitsState,
            status: statusInitState
        });

        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });

        expect(result.current.usePreaching.state).toEqual({
            ...preachingSelectedState,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...preachingSelectedState.seletedPreaching,
                day: expect.any(String),
                init_hour: expect.any(String),
                final_hour: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });
    });

    it('should fail when preaching day does not belong to user', async () => {
        const mockStore = getMockStoreComplete({
            auth: authInitState,
            courses: coursesState,
            preaching: preachingSelectedState,
            revisits: revisitsState,
            status: statusInitState
        });

        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'Lo sentimos, pero no puedes realizar está acción.'
        });

        expect(result.current.usePreaching.state).toEqual({
            ...preachingSelectedState,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...preachingSelectedState.seletedPreaching,
                day: expect.any(String),
                init_hour: expect.any(String),
                final_hour: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});