import { act } from '@testing-library/react-native';

/* Setups */
import { mockUseNavigation } from '../../../../../../jest.setup';
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

const initialMockStore = getMockStoreUsePreaching({
    auth: initialAuthStateMock,
    preaching: initialPreachingStateMock,
    status: initialStatusStateMock
});

const mockStoreWithCurrentSelectedDate = getMockStoreUsePreaching({
    auth: initialAuthStateMock,
    preaching: {
        ...initialPreachingStateMock,
        selectedDate: new Date()
    },
    status: initialStatusStateMock
});

describe('Test in usePreaching hook - updatePreaching', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update preaching day successfully', async () => {
        const { result } = renderUsePreaching(initialMockStore);

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
            result.current.usePreaching.setSelectedPreaching(result.current.usePreaching.state.preachings[0]);
        });

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            preachings: [{
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
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

        expect(result.current.usePreaching.state.preachings).toHaveLength(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Has actualizado tu día de predicación correctamente.'
        });

        /* Check if goBack is called two times */
        expect(mockUseNavigation.goBack).toHaveBeenCalledTimes(2);

        await act(async () => {
            await result.current.usePreaching.deletePreaching();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user inst authenticated', async () => {
        const { result } = renderUsePreaching(mockStoreWithCurrentSelectedDate);

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date)
        });

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should faild when selectedPreaching is empty', async () => {
        const { result } = renderUsePreaching(mockStoreWithCurrentSelectedDate);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date)
        });

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay un día de predicación seleccionado para actualizar.'
        });

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });
    });
});