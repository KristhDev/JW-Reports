import { act } from '@testing-library/react-native';

import { initialState as authInitState } from '../../features/auth';
import { initialState as preachingInitState } from '../../features/preaching';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test usePreaching hook setIsPreachingsLoading', () => {
    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: authInitState, preaching: preachingInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePreaching.setIsPreachingsLoading(true);
        });

        expect(result.current.usePreaching.state).toEqual({
            ...preachingInitState,
            isPreachingsLoading: true
        });

        await act(async () => {
            await result.current.usePreaching.setIsPreachingsLoading(false);
        });

        expect(result.current.usePreaching.state).toEqual({
            ...preachingInitState,
            isPreachingsLoading: false
        });
    });
});