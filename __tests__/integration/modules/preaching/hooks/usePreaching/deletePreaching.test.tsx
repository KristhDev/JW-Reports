import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, useNetworkSpy } from '../../../../../../jest.setup';
import { getMockStoreUsePreaching, renderUsePreaching } from '../../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialPreachingStateMock,
    initialStatusStateMock,
    preachingSelectedStateMock,
    testCredentials,
    wifiMock
} from '../../../../../mocks';

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

describe('Test usePreaching hook - deletePreaching', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    let mockStorePreachingSelected = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStorePreachingSelected = getMockStoreUsePreaching({
            auth: initialAuthStateMock,
            preaching: preachingSelectedStateMock,
            status: initialStatusStateMock
        });
    });

    it('should delete preaching day successfully', async () => {
        const { result } = renderUsePreaching(mockStoreWithCurrentSelectedDate);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.savePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date(),
            });

            result.current.usePreaching.setSelectedPreaching(result.current.usePreaching.state.preachings[0]);
        });

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...initialPreachingStateMock.seletedPreaching,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Has eliminado tu día de predicación correctamente.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when selectedPreaching is empty', async () => {
        const { result } = renderUsePreaching(initialMockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay un día de predicación seleccionado para eliminar.'
        });

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...initialPreachingStateMock.seletedPreaching,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user is unauthenticated', async () => {
        const { result } = renderUsePreaching(mockStorePreachingSelected);

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual({
            ...preachingSelectedStateMock,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...preachingSelectedStateMock.seletedPreaching,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });
    });

    it('should faild when preaching day does not belong to user', async () => {
        const { result } = renderUsePreaching(mockStorePreachingSelected);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.deletePreaching(onFinishMock);
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'Lo sentimos, pero no puedes realizar está acción.'
        });

        /* Check if state is equal to preachings state */
        expect(result.current.usePreaching.state).toEqual({
            ...preachingSelectedStateMock,
            selectedDate: expect.any(Date),
            seletedPreaching: {
                ...preachingSelectedStateMock.seletedPreaching,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});