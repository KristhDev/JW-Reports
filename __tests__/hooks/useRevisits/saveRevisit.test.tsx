import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as revisitsInitState } from '../../features/revisits';
import { initialState as statusInitState } from '../../features/status';

import { useTheme } from '../../../src/hooks';

import { getMockStore, onFinishMock, render, testRevisit } from './setup';

import { darkColors } from '../../../src/theme';

import { navigateMock } from '../../../jest.setup';

jest.mock('../../../src/hooks/useTheme.ts');

describe('Test useRevisits hook saveRevisit', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save revisit successfully', async () => {
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
            }]
        });

        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: 'Haz agregado tu revisita correctamente.'
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('RevisitsTopTabsNavigation');

        await act(async () => {
            await result.current.useRevisits.setSelectedRevisit(result.current.useRevisits.state.revisits[0]);
        });

        await act(async () => {
            await result.current.useRevisits.deleteRevisit();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should show other message when back is false', async () => {
        const mockStore = getMockStore({ auth: authInitState, revisits: revisitsInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: false,
                onFinish: onFinishMock,
                revisitValues: testRevisit
            });
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
            }]
        });

        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: `Haz agregado correctamente a ${ testRevisit.person_name } para volverla a visitar.`
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).not.toHaveBeenCalled();

        await act(async () => {
            await result.current.useRevisits.setSelectedRevisit(result.current.useRevisits.state.revisits[0]);
        });

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
            await result.current.useRevisits.saveRevisit({
                back: true,
                onFinish: onFinishMock,
                revisitValues: testRevisit
            });
        });

        expect(result.current.useRevisits.state).toEqual(revisitsInitState);

        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);
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
                revisitValues: {
                    ...testRevisit,
                    next_visit: new Date('invalid')
                }
            });
        });

        expect(result.current.useRevisits.state).toEqual(revisitsInitState);

        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});