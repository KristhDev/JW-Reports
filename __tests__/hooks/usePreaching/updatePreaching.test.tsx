import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStoreComplete, render } from './setup';
import { goBackMock } from '../../../jest.setup';

/* Mocks */
import { coursesStateMock, initialAuthStateMock, initialPreachingStateMock, initialStatusStateMock, revisitsStateMock, testCredentials, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test in usePreaching updatePreaching', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update preaching day successfully', async () => {
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
            msg: 'Haz actualizado tu día de predicación correctamente.'
        });

        /* Check if goBack is called two times */
        expect(goBackMock).toHaveBeenCalledTimes(2);

        await act(async () => {
            await result.current.usePreaching.deletePreaching();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst authenticated', async () => {
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

    it('should fail when selectedPreaching is empty', async () => {
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