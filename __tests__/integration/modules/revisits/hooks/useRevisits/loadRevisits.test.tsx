import { act } from '@testing-library/react-native';

/* Setups */
import { useNetworkSpy } from '../../../../../../jest.setup';
import { getMockStoreUseRevisits, renderUseRevisits } from '../../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    testCredentials,
    wifiMock
} from '../../../../../mocks';

describe('Test in useRevisits hook - loadRevisits', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    let mockStore = {} as any;

    beforeEach(() => {
        mockStore = getMockStoreUseRevisits({
            auth: initialAuthStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should load revisits successfully', async () => {
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.loadRevisits({ filter: 'all' });
        });

        /* Check if hasMoreRevisits is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            hasMoreRevisits: false
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user inst authenticated', async () => {
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.loadRevisits({ filter: 'visited' });
        });

        /* Check if revisitFilter is changed */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisitFilter: 'visited'
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });
});