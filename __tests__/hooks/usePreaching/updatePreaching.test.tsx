import { act } from '@testing-library/react-native';

import { getMockStoreComplete, render } from './setup';

import { goBackMock } from '../../../jest.setup';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { coursesState } from '../../features/courses';
import { initialState as preachingInitState } from '../../features/preaching';
import { revisitsState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

describe('Test in usePreaching updatePreaching', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update preaching day successfully', async () => {
        const mockStore = getMockStoreComplete({
            auth: authInitState,
            courses: coursesState,
            preaching: {
                ...preachingInitState,
                selectedDate: new Date()
            },
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
        });

        await act(async () => {
            await result.current.usePreaching.setSelectedPreaching(result.current.usePreaching.state.preachings[0]);
        });

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
                day: new Date(),
                init_hour: new Date(),
                final_hour: new Date(),
                publications: 2,
                revisits: 2,
                videos: 1
            });
        });

        expect(result.current.usePreaching.state).toEqual({
            ...preachingInitState,
            selectedDate: expect.any(Date),
            preachings: [{
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                day: expect.any(String),
                init_hour: expect.any(String),
                final_hour: expect.any(String),
                publications: 2,
                revisits: 2,
                videos: 1,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            seletedPreaching: {
                id: '',
                user_id: '',
                day: expect.any(String),
                init_hour: expect.any(String),
                final_hour: expect.any(String),
                publications: 0,
                revisits: 0,
                videos: 0,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        expect(result.current.usePreaching.state.preachings).toHaveLength(1);

        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz actualizado tu día de predicación correctamente.'
        });

        expect(goBackMock).toHaveBeenCalledTimes(2);

        await act(async () => {
            await result.current.usePreaching.deletePreaching();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst authenticated', async () => {
        const mockStore = getMockStoreComplete({
            auth: authInitState,
            courses: coursesState,
            preaching: {
                ...preachingInitState,
                selectedDate: new Date()
            },
            revisits: revisitsState,
            status: statusInitState
        });

        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
                day: new Date(),
                init_hour: new Date(),
                final_hour: new Date(),
                publications: 2,
                revisits: 2,
                videos: 1
            });
        });

        expect(result.current.usePreaching.state).toEqual({
            ...preachingInitState,
            selectedDate: expect.any(Date)
        });

        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debes iniciar sesión.'
        });
    });

    it('should fail when selectedPreaching is empty', async () => {
        const mockStore = getMockStoreComplete({
            auth: authInitState,
            courses: coursesState,
            preaching: {
                ...preachingInitState,
                selectedDate: new Date()
            },
            revisits: revisitsState,
            status: statusInitState
        });

        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
                day: new Date(),
                init_hour: new Date(),
                final_hour: new Date(),
                publications: 2,
                revisits: 2,
                videos: 1
            });
        });

        expect(result.current.usePreaching.state).toEqual({
            ...preachingInitState,
            selectedDate: expect.any(Date)
        });

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay un día de predicación seleccionado para actualizar.'
        });

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });
    });
});