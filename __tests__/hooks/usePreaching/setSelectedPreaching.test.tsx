import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState } from '../../features/auth';
import { initialState as preachingInitState, preachings } from '../../features/preaching';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test usePreaching hook setSelectedPreaching', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

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