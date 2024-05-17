import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUsePreaching, renderUsePreaching } from '../../../../../setups';

/* Mocks */
import { initialAuthStateMock, initialPreachingStateMock, initialStatusStateMock, wifiMock } from '../../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUsePreaching({
    auth: initialAuthStateMock,
    preaching: initialPreachingStateMock,
    status: initialStatusStateMock
});

describe('Test usePreaching hook - setSelectedDate', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock,
    });

    it('should change respective property', async () => {
        const { result } = renderUsePreaching(mockStore);

        await act(() => {
            result.current.usePreaching.setSelectedDate(new Date('2023-03-17'));
        });

        /* Check if selectedDate is changed */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: new Date('2023-03-17')
        });
    });
});