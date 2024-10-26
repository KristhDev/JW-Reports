/* Hooks */
import * as useEmail from '@shared/hooks/useEmail';
import * as useImage from '@shared/hooks/useImage';
import * as useNetwork from '@shared/hooks/useNetwork';
import * as usePermissions from '@shared/hooks/usePermissions';
import * as useStatus from '@shared/hooks/useStatus';

export const useEmailSpy = jest.spyOn(useEmail, 'default');
export const useImageSpy = jest.spyOn(useImage, 'default');
export const useNetworkSpy = jest.spyOn(useNetwork, 'default');
export const usePermissionsSpy = jest.spyOn(usePermissions, 'default');
export const useStatusSpy = jest.spyOn(useStatus, 'default');

export const onCancelMock = jest.fn();
export const onChangeValueMock = jest.fn();
export const onCleanMock = jest.fn();
export const onCloseMock = jest.fn();
export const onCofirmMock = jest.fn();
export const onErrorMock = jest.fn();
export const onFinishMock = jest.fn();
export const onPressMock = jest.fn();
export const onSearchMock = jest.fn();
export const onSuccessMock = jest.fn();
export const onToggleMock = jest.fn();