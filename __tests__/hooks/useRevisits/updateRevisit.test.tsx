import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as revisitsInitState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

import { useTheme } from '../../../src/hooks';

import { getMockStore, onFinishMock, render, testRevisit } from './setup';

import { darkColors } from '../../../src/theme';

import { goBackMock } from '../../../jest.setup';

jest.mock('../../../src/hooks/useTheme.ts');

describe('Test useRevisits hook updateRevisit', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update revisit successfully', async () => {
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
            await result.current.useRevisits.updateRevisit({ ...testRevisit, person_name: 'Chris Frami' });
        });

        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            revisits: [{
                ...testRevisit,
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                person_name: 'Chris Frami',
                next_visit: expect.any(String),
                photo: null,
                done: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            selectedRevisit: {
                ...testRevisit,
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                person_name: 'Chris Frami',
                next_visit: expect.any(String),
                photo: null,
                done: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz actualizado tu revisita correctamente.'
        });

        expect(goBackMock).toHaveBeenCalledTimes(1);

        await act(async () => {
            await result.current.useRevisits.deleteRevisit();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst authenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useRevisits.updateRevisit(testRevisit);
        });

        expect(result.current.useRevisits.state).toEqual(revisitsInitState);

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
            await result.current.useRevisits.updateRevisit(testRevisit);
        });

        expect(result.current.useRevisits.state).toEqual(revisitsInitState);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una revisita seleccionada para actualizar.'
        });
    });

    it('should fail when data is invalid', async () => {
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
            await result.current.useRevisits.updateRevisit({ ...testRevisit, next_visit: new Date('invalid') });
        });

        expect(result.current.useRevisits.state).toEqual({
            ...revisitsInitState,
            revisits: [{
                ...testRevisit,
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                next_visit: expect.any(String),
                photo: null,
                done: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            selectedRevisit: {
                ...testRevisit,
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                next_visit: expect.any(String),
                photo: null,
                done: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        expect(goBackMock).not.toHaveBeenCalled();

        await act(async () => {
            await result.current.useRevisits.deleteRevisit();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});