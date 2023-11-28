import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStoreComplete, onFinishMock, render } from './setup';

/* Mocks */
import { coursesStateMock, initialAuthStateMock, initialPreachingStateMock, initialStatusStateMock, preachingSelectedStateMock, revisitsStateMock, testCredentials, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test usePreaching hook deletePreaching', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete preaching day successfully', async () => {
        const mockStore = getMockStoreComplete({
            auth: initialAuthStateMock,
            courses: coursesStateMock,
            preaching: {
                ...initialPreachingStateMock,
                selectedDate: new Date()
            },
            revisits: revisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = render(mockStore);

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
            msg: 'Haz eliminado tu día de predicación correctamente.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when selectedPreaching is empty', async () => {
        const mockStore = getMockStoreComplete({
            auth: initialAuthStateMock,
            courses: coursesStateMock,
            preaching: initialPreachingStateMock,
            revisits: revisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = render(mockStore);

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

    it('should fail when user is unauthenticated', async () => {
        const mockStore = getMockStoreComplete({
            auth: initialAuthStateMock,
            courses: coursesStateMock,
            preaching: preachingSelectedStateMock,
            revisits: revisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = render(mockStore);

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

    it('should fail when preaching day does not belong to user', async () => {
        const mockStore = getMockStoreComplete({
            auth: initialAuthStateMock,
            courses: coursesStateMock,
            preaching: preachingSelectedStateMock,
            revisits: revisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = render(mockStore);

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