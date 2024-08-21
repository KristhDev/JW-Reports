import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, mockUseNavigation, useNetworkSpy } from '../../../../../../jest.setup';
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

describe('Test useRevisits hook - saveRevisit', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseRevisits({
            auth: initialAuthStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should save revisit successfully', async () => {
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: true,
                onFinish: onFinishMock,
                image: null,
                revisitValues: testRevisit
            });
        });

        /* Check if revisits state contain new revisit */
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
            code: 201,
            msg: 'Has agregado tu revisita correctamente.'
        });

        /* Check if onFinish and navigate is called one time with respective arg */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('RevisitsTopTabsNavigation');

        await act(async () => {
            result.current.useRevisits.setSelectedRevisit(result.current.useRevisits.state.revisits[0]);
        });

        await act(async () => {
            await result.current.useRevisits.deleteRevisit();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should show other message when back is false', async () => {
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: false,
                onFinish: onFinishMock,
                image: null,
                revisitValues: testRevisit
            });
        });

        /* Check if revisits state contain new revisit */
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
            code: 201,
            msg: `Has agregado correctamente a ${ testRevisit.personName } para volverla a visitar.`
        });

        /* Check if onFinish is called one time and navigate inst called */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).not.toHaveBeenCalled();

        await act(async () => {
            result.current.useRevisits.setSelectedRevisit(result.current.useRevisits.state.revisits[0]);
        });

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
            await result.current.useRevisits.saveRevisit({
                back: true,
                onFinish: onFinishMock,
                image: null,
                revisitValues: testRevisit
            });
        });

        /* Check if revisits state is equal to initial state */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
    });

    it('should faild when data is invalid', async () => {
        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useRevisits.saveRevisit({
                back: true,
                image: null,
                onFinish: onFinishMock,
                revisitValues: {
                    ...testRevisit,
                    nextVisit: new Date('invalid')
                }
            });
        });

        /* Check if revisits state is equal to initial state */
        expect(result.current.useRevisits.state).toEqual(initialRevisitsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});