import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { initialState as preachingInitState, preachingsState } from '../../features/preaching';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test usePreaching hook clearPreaching', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

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