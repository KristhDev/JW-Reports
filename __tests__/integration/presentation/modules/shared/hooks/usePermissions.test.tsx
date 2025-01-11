import { act } from '@testing-library/react-native';
import { request } from 'react-native-permissions';

/* Setup */
import { getMockStoreUsePermissions, renderUsePermissions } from '@setups';

/* Mocks */
import { grantedStateMock, initialPermissionsStateMock, initialStatusStateMock } from '@mocks';

/* Constants */
import { permissionsMessages, permissionsStatus } from '@application/constants';

describe('Test in usePermissions hook', () => {
    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUsePermissions({
            permissions: initialPermissionsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should return respective props', () => {
        const { result } = renderUsePermissions(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.usePermissions).toEqual({
            state: initialPermissionsStateMock,
            checkPermissions: expect.any(Function),
            requestPermissions: expect.any(Function),
            askPermission: expect.any(Function),
        });
    });

    it('should getPermissions - checkPermissions', async () => {
        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            await result.current.usePermissions.checkPermissions();
        });

        /* Check if permissions are updated */
        expect(result.current.usePermissions.state).toEqual({
            ...grantedStateMock,
            isPermissionsRequested: false
        });
    });

    it('should getPermission - askPermission', async () => {
        (request as jest.Mock).mockResolvedValue(permissionsStatus.DENIED);

        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            const status = await result.current.usePermissions.askPermission('mediaLibrary');
            expect(status).toEqual(permissionsStatus.DENIED);
        });

        /* Check if permissions are updated in property mediaLibrary */
        expect(result.current.usePermissions.state).toEqual({
            isPermissionsRequested: false,
            permissions: {
                ...initialPermissionsStateMock.permissions,
                mediaLibrary: permissionsStatus.DENIED
            }
        });
    });

    it('should change status if permission is undermined', async () => {
        (request as jest.Mock).mockResolvedValue(permissionsStatus.UNDETERMINED);

        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            await result.current.usePermissions.askPermission('camera');
        });

        /**
         * Check if premissions is equal to initial state and status
         * is update with respective data
         */
        expect(result.current.usePermissions.state).toEqual(initialPermissionsStateMock);
        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.UNSUPPORTED,
            code: 418
        });
    });
});