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

describe('Test useRevisits hook - setRevisitsPagination', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should change respective property', async () => {
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            result.current.useRevisits.setRevisitsPagination({
                from: 10,
                to: 19
            });
        });

        /* Check if revisitsPagination is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisitsPagination: {
                from: 10,
                to: 19
            }
        });

        await act(async () => {
            result.current.useRevisits.setRevisitsPagination({
                from: 0,
                to: 9
            });
        });

        /* Check if revisitsPagination is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisitsPagination: {
                from: 0,
                to: 9
            }
        });
    });
});