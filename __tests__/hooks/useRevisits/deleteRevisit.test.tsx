import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as revisitsInitState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

import { useTheme } from '../../../src/hooks';

import { getMockStore, onFinishMock, render, testRevisit } from './setup';

import { darkColors } from '../../../src/theme';

import { navigateMock } from '../../../jest.setup';

jest.mock('../../../src/hooks/useTheme.ts');

describe('Test useRevisits hook deleteRevisit', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete revisit successfully', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
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
            await result.current.useRevisits.setSelectedRevisit(result.current.useRevisits.state.revisits[0]);
        });

        await act(async () => {
            await result.current.useRevisits.deleteRevisit(false, onFinishMock);
        });

        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            selectedRevisit: {
                ...revisitsInitState.selectedRevisit,
                next_visit: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            revisits: []
        });

        expect(result.current.useRevisits.state.revisits).toHaveLength(0);
        expect(onFinishMock).toHaveBeenCalledTimes(2);
        expect(navigateMock).toHaveBeenCalledTimes(1);

        expect(navigateMock).toHaveBeenCalledWith('RevisitsTopTabsNavigation');

        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz eliminado tu revisita correctamente.'
        });
    });

    it('should fail when user inst authenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useRevisits.deleteRevisit(false, onFinishMock);
        });

        expect(result.current.useRevisits.state).toEqual(revisitsInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

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
            await result.current.useRevisits.deleteRevisit(false, onFinishMock);
        });

        expect(result.current.useRevisits.state).toEqual(revisitsInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una revisita seleccionada para eliminar.'
        });
    });
});