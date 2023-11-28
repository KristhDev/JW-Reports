/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialPreachingStateMock, initialStatusStateMock, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test usePreaching hook', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    it('should return respective props', () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, preaching: initialPreachingStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching).toEqual({
            state: initialPreachingStateMock,

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