import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUsePreaching, renderUsePreaching } from '../../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialPreachingStateMock,
    initialStatusStateMock,
    testCredentials,
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

describe('Test usePreaching hook - loadPreachings', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock,
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
            preachings: [
                {
                    id: expect.any(String),
                    userId: expect.any(String),
                    day: expect.any(String),
                    initHour: expect.any(String),
                    finalHour: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }
            ],
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

        await act(async () => {
            result.current.usePreaching.setSelectedPreaching(result.current.usePreaching.state.preachings[0]);
            await result.current.usePreaching.deletePreaching();
        });

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