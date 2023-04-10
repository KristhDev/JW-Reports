import { act } from '@testing-library/react-native';

import { initialState as authInitState } from '../../features/auth';
import { initialState as preachingInitState, preachingsState } from '../../features/preaching';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test usePreaching hook clearPreaching', () => {
    it('should clear state', async () => {
        const mockStore = getMockStore({ auth: authInitState, preaching: preachingsState, status: statusInitState });
        const { result } = render(mockStore);

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual(preachingsState);

        await act(async () => {
            await result.current.usePreaching.clearPreaching();
        });

        /* Check if state is equal to initial state */
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
    });
});