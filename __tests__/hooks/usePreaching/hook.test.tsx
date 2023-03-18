import { initialState as authInitState } from '../../features/auth';
import { initialState as preachingInitState } from '../../features/preaching';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test usePreaching hook', () => {
    it('should return respective props', () => {
        const mockStore = getMockStore({ auth: authInitState, preaching: preachingInitState, status: statusInitState });
        const { result } = render(mockStore);

        expect(result.current.usePreaching).toEqual({
            state: preachingInitState,
            clearPreaching: expect.any(Function),
            setIsPreachingsLoading: expect.any(Function),
            setSelectedDate: expect.any(Function),
            setSelectedPreaching: expect.any(Function),
            deletePreaching: expect.any(Function),
            loadPreachings: expect.any(Function),
            savePreaching: expect.any(Function),
            updatePreaching: expect.any(Function)
        });
    });
});