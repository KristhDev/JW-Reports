import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { initialState as preachingInitState, preachings } from '../../features/preaching';
import { initialState as statusInitState } from '../../features/status';

/* Setup */
import { getMockStore, render } from './setup';

describe('Test usePreaching hook setSelectedPreaching', () => {
    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: authInitState, preaching: preachingInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePreaching.setSelectedPreaching(preachings[0]);
        });

        /* Check if seletedPreaching is changed */
        expect(result.current.usePreaching.state).toEqual({
            ...preachingInitState,
            seletedPreaching: preachings[0]
        });
    });
});