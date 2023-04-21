
/* Features */
import { initialState as authInitState } from '../../features/auth';
import { initialState as preachingInitState } from '../../features/preaching';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test usePreaching hook', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    it('should return respective props', () => {
        const mockStore = getMockStore({ auth: authInitState, preaching: preachingInitState, status: statusInitState });
        const { result } = render(mockStore);

        /* Check if state is equal to preachings state */
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