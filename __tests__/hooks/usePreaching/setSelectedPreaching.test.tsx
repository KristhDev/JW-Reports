import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialPreachingStateMock, initialStatusStateMock, preachingsMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test usePreaching hook setSelectedPreaching', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, preaching: initialPreachingStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(() => {
            result.current.usePreaching.setSelectedPreaching(preachingsMock[0]);
        });

        /* Check if seletedPreaching is changed */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            seletedPreaching: preachingsMock[0]
        });
    });
});