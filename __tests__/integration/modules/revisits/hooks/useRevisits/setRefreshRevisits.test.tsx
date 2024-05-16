import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseRevisits, renderUseRevisits } from '../../../../../setups';

/* Mocks */
import { initialAuthStateMock, initialRevisitsStateMock, initialStatusStateMock, wifiMock } from '../../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUseRevisits({
    auth: initialAuthStateMock,
    revisits: initialRevisitsStateMock,
    status: initialStatusStateMock
});

describe('Test useRevisits hook - setRefreshRevisits', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should change respective property', async () => {
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            result.current.useRevisits.setRefreshRevisits(true);
        });

        /* Check if refreshRevisits is changed */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            refreshRevisits: true
        });

        await act(async () => {
            result.current.useRevisits.setRefreshRevisits(false);
        });

        /* Check if refreshRevisits is changed */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            refreshRevisits: false
        });
    });
});