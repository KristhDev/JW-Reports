import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, mockUseNavigation } from '../../../../../../jest.setup';
import { getMockStoreUseRevisits, renderUseRevisits } from '../../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    testCredentials,
    testRevisit,
    wifiMock
} from '../../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUseRevisits({
    auth: initialAuthStateMock,
    revisits: initialRevisitsStateMock,
    status: initialStatusStateMock
});

describe('Test useRevisits hook - updateRevisit', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update revisit successfully', async () => {
        const { result } = renderUseRevisits(mockStore);

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
            msg: 'Has actualizado tu revisita correctamente.'
        });

        /* Check if goBack is called one time */
        expect(mockUseNavigation.goBack).toHaveBeenCalledTimes(1);

        await act(async () => {
            await result.current.useRevisits.deleteRevisit();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user inst authenticated', async () => {
        const { result } = renderUseRevisits(mockStore);

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

    it('should faild when selectedRevisit is empty', async () => {
        const { result } = renderUseRevisits(mockStore);

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

    it('should faild when data is invalid', async () => {
        const { result } = renderUseRevisits(mockStore);

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
        expect(mockUseNavigation.goBack).not.toHaveBeenCalled();

        await act(async () => {
            await result.current.useRevisits.deleteRevisit();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});