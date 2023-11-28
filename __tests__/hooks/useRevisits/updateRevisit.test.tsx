import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork, useTheme } from '../../../src/hooks';

/* Setup */
import { getMockStore, onFinishMock, render } from './setup';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { goBackMock } from '../../../jest.setup';

/* Mocks */
import { initialAuthStateMock, initialRevisitsStateMock, initialStatusStateMock, testCredentials, testRevisit, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test useRevisits hook updateRevisit', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock,
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update revisit successfully', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, revisits: initialRevisitsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: true,
                onFinish: onFinishMock,
                revisitValues: testRevisit
            });
        });

        await act(async () => {
            result.current.useRevisits.setSelectedRevisit(result.current.useRevisits.state.revisits[0]);
        });

        await act(async () => {
            await result.current.useRevisits.updateRevisit({ ...testRevisit, personName: 'Chris Frami' });
        });

        /* Check if revisits and selectedRevisit is updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisits: [{
                ...testRevisit,
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                personName: 'Chris Frami',
                nextVisit: expect.any(String),
                photo: null,
                done: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
            selectedRevisit: {
                ...testRevisit,
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                personName: 'Chris Frami',
                nextVisit: expect.any(String),
                photo: null,
                done: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastRevisit: {
                ...testRevisit,
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                personName: 'Chris Frami',
                nextVisit: expect.any(String),
                photo: null,
                done: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz actualizado tu revisita correctamente.'
        });

        /* Check if goBack is called one time */
        expect(goBackMock).toHaveBeenCalledTimes(1);

        await act(async () => {
            await result.current.useRevisits.deleteRevisit();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst authenticated', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, revisits: initialRevisitsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useRevisits.updateRevisit(testRevisit);
        });

        /* Check if revisits state inst changed */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should fail when selectedRevisit is empty', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, revisits: initialRevisitsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.updateRevisit(testRevisit);
        });

        /* Check if revisits state inst changed */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una revisita seleccionada para actualizar.'
        });
    });

    it('should fail when data is invalid', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, revisits: initialRevisitsStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: true,
                onFinish: onFinishMock,
                revisitValues: testRevisit
            });
        });

        await act(async () => {
            result.current.useRevisits.setSelectedRevisit(result.current.useRevisits.state.revisits[0]);
        });

        await act(async () => {
            await result.current.useRevisits.updateRevisit({ ...testRevisit, nextVisit: new Date('invalid') });
        });

        /* Check if revisits and selectedRevisits inst updated */
        expect(result.current.useRevisits.state).toEqual({
            ...initialRevisitsStateMock,
            revisits: [{
                ...testRevisit,
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                nextVisit: expect.any(String),
                photo: null,
                done: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
            selectedRevisit: {
                ...testRevisit,
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                nextVisit: expect.any(String),
                photo: null,
                done: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastRevisit: {
                ...testRevisit,
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                nextVisit: expect.any(String),
                photo: null,
                done: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        /* Check if goBack inst called */
        expect(goBackMock).not.toHaveBeenCalled();

        await act(async () => {
            await result.current.useRevisits.deleteRevisit();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});