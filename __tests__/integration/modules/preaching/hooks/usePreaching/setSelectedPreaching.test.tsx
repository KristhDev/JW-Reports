import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUsePreaching, renderUsePreaching } from '../../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialPreachingStateMock,
    initialStatusStateMock,
    preachingsMock,
    wifiMock
} from '../../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUsePreaching({
    auth: initialAuthStateMock,
    preaching: initialPreachingStateMock,
    status: initialStatusStateMock
});

describe('Test usePreaching hook - setSelectedPreaching', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should change respective property', async () => {
        const { result } = renderUsePreaching(mockStore);

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