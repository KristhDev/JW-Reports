import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUsePreaching, renderUsePreaching } from '../../../../../setups';

/* Setup */
import { useNetworkSpy } from '../../../../../../jest.setup';

/* Mocks */
import {
    initialAuthStateMock,
    initialPreachingStateMock,
    initialStatusStateMock,
    testCredentials,
    wifiMock
} from '../../../../../mocks';
import { supabase } from '../../../../../config';

describe('Test usePreaching hook - loadPreachings', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    let mockStore = {} as any;

    beforeEach(() => {
        mockStore = getMockStoreUsePreaching({
            auth: initialAuthStateMock,
            preaching: initialPreachingStateMock,
            status: initialStatusStateMock
        });
    });

    it('should load preachings day successfully', async () => {
        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.savePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        await act(() => {
            result.current.usePreaching.clearPreaching();
        });

        await act(async () => {
            await result.current.usePreaching.loadPreachings(new Date());
        });

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            preachings: expect.any(Array),
            seletedPreaching: {
                id: '',
                userId: '',
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        result.current.usePreaching.state.preachings.forEach((preaching) => {
            expect(preaching).toEqual({
                id: expect.any(String),
                userId: expect.any(String),
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        });

        await supabase.from('preachings')
            .delete()
            .eq('user_id', result.current.useAuth.state.user.id);

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user is unauthenticated', async () => {
        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.loadPreachings(new Date());
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual(initialPreachingStateMock);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });
});