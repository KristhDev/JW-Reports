import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialPreachingStateMock, initialStatusStateMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test usePreaching hook setIsPreachingsLoading', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, preaching: initialPreachingStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(() => {
            result.current.usePreaching.setIsPreachingsLoading(true);
        });

        /* Check if isPreaching is changed */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            isPreachingsLoading: true
        });

        await act(() => {
            result.current.usePreaching.setIsPreachingsLoading(false);
        });

        /* Check if isPreaching is changed */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            isPreachingsLoading: false
        });
    });
});