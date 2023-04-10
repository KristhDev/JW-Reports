import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as revisitsInitState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Setup */
import { getMockStore, onFinishMock, render, testRevisit } from './setup';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test useRevisits hook completeRevisit', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should complete revisit successfully', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: true,
                revisitValues: testRevisit
            });
        });

        await act(async () => {
            await result.current.useRevisits.setSelectedRevisit(result.current.useRevisits.state.revisits[0]);
        });

        await act(async () => {
            await result.current.useRevisits.completeRevisit(onFinishMock);
        });

        /* Check if selectedRevisit and revisits are changed */
        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            selectedRevisit: {
                ...result.current.useRevisits.state.selectedRevisit,
                done: true,
                next_visit: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            revisits: [{
                ...result.current.useRevisits.state.revisits[0],
                done: true,
                next_visit: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }]
        });

        /* Check if length of revisits is more than one and onFinish isnt called */
        expect(result.current.useRevisits.state.revisits).toHaveLength(1);
        expect(onFinishMock).not.toHaveBeenCalled();

        await act(async () => {
            await result.current.useRevisits.deleteRevisit();
        });
    });

    it('should fail when user inst authenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useRevisits.completeRevisit(onFinishMock);
        });

        /**
         * Check if revisits state is equal to initial state and onFinish
         * is called one time
         */
        expect(result.current.useRevisits.state).toEqual(revisitsInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should fail when selectedRevisit is empty', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.completeRevisit(onFinishMock);
        });

        /**
         * Check if revisits state is equal to initial state and onFinish
         * is called one time
         */
        expect(result.current.useRevisits.state).toEqual(revisitsInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una revisita seleccionada para completar.'
        });
    });
});