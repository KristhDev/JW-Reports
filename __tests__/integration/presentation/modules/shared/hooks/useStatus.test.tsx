import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUseStatus, renderUseStatus } from '@setups';

/* Mocks */
import { initialStatusStateMock, successStateMock, errorStateMock, networkStateMock } from '@mocks';

/* Errors */
import { RequestError } from '@domain/errors';

describe('Test in useStatus hook', () => {
    it('should return the initial state', () => {
        const mockStore = getMockStoreUseStatus({ ...initialStatusStateMock });
        const { result } = renderUseStatus(mockStore);

        /* Check if hook return respective properties */
        expect(result.current).toEqual({
            state: initialStatusStateMock,
            clearStatus: expect.any(Function),
            setError: expect.any(Function),
            setErrorForm: expect.any(Function),
            setNetworkError: expect.any(Function),
            setStatus: expect.any(Function),
            setUnauthenticatedError: expect.any(Function)
        });
    });

    it('should clean state with clearStatus', () => {
        const mockStore = getMockStoreUseStatus({ ...errorStateMock });
        const { result } = renderUseStatus(mockStore);

        /* Check if state is equal to error state */
        expect(result.current.state).toEqual(errorStateMock);

        act(() => {
            result.current.clearStatus();
        });

        /* Check if state is cleaning */
        expect(result.current.state).toEqual(initialStatusStateMock);
    });

    it('should change the state - setError', () => {
        const mockStore = getMockStoreUseStatus({ ...initialStatusStateMock });
        const { result } = renderUseStatus(mockStore);

        /* Check if state is equal to initial state */
        expect(result.current.state).toEqual(initialStatusStateMock);

        const requestError = new RequestError('Invalid email', 400, 'invalid_credentials');

        act(() => {
            result.current.setError(requestError);
        });

        /* Check if state is updated */
        expect(result.current.state).toEqual({
            msg: expect.any(String),
            code: 400
        });
    });

    it('should change the state - setErrorForm', () => {
        const mockStore = getMockStoreUseStatus({ ...initialStatusStateMock });
        const { result } = renderUseStatus(mockStore);

        /* Check if state is equal to initial state */
        expect(result.current.state).toEqual(initialStatusStateMock);

        act(() => {
            result.current.setErrorForm({ name: 'El nombre es obligatorio' });
        });

        /* Check if state is updated */
        expect(result.current.state).toEqual({
            msg: 'El nombre es obligatorio',
            code: 400
        });
    });

    it('should change the state - setStatus', () => {
        const mockStore = getMockStoreUseStatus({ ...initialStatusStateMock });
        const { result } = renderUseStatus(mockStore);

        /* Check if state is equal to initial state */
        expect(result.current.state).toEqual(initialStatusStateMock);

        act(() => {
            result.current.setStatus({ ...successStateMock });
        });

        /* Check if state is updated */
        expect(result.current.state).toEqual(successStateMock);
    });

    it('should set network error - setNetworkError', () => {
        const mockStore = getMockStoreUseStatus({ ...initialStatusStateMock });
        const { result } = renderUseStatus(mockStore);

        act(() => {
            result.current.setNetworkError();
        });

        expect(result.current.state).toEqual(networkStateMock);
    });
});