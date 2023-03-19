import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { coursesState } from '../../features/courses';
import { initialState as preachingInitState } from '../../features/preaching';
import { revisitsState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

import { getMockStoreComplete, render } from './setup';

describe('Test usePreaching hook loadPreachings', () => {
    it('should load preachings day successfully', async () => {
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
            await result.current.usePreaching.clearPreaching();
        });

        await act(async () => {
            await result.current.usePreaching.loadPreachings(new Date());
        });

        expect(result.current.usePreaching.state).toEqual({
            ...preachingInitState,
            selectedDate: expect.any(Date),
            preachings: [
                {
                    id: expect.any(String),
                    user_id: expect.any(String),
                    day: expect.any(String),
                    init_hour: expect.any(String),
                    final_hour: expect.any(String),
                    publications: expect.any(Number),
                    revisits: expect.any(Number),
                    videos: expect.any(Number),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                },
                {
                    id: expect.any(String),
                    user_id: expect.any(String),
                    day: expect.any(String),
                    init_hour: expect.any(String),
                    final_hour: expect.any(String),
                    publications: expect.any(Number),
                    revisits: expect.any(Number),
                    videos: expect.any(Number),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                }
            ],
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

        await act(async () => {
            await result.current.usePreaching.setSelectedPreaching(result.current.usePreaching.state.preachings[0]);
            await result.current.usePreaching.deletePreaching();
        });

        await act(async () => {
            await result.current.usePreaching.setSelectedPreaching(result.current.usePreaching.state.preachings[0]);
            await result.current.usePreaching.deletePreaching();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user is unauthenticated', async () => {
        const mockStore = getMockStoreComplete({
            auth: authInitState,
            courses: coursesState,
            preaching: preachingInitState,
            revisits: revisitsState,
            status: statusInitState
        });

        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePreaching.loadPreachings(new Date());
        });

        expect(result.current.usePreaching.state).toEqual(preachingInitState);

        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });
});