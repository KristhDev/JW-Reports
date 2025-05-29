import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';

import { ToastOptions } from '@application/context';

import { ToasterAdapterContract, TranslationAdapterContract } from '@domain/contracts/adapters';
import { LoggerServiceContract, MessagesServiceContract } from '@domain/contracts/services';

import {
    CloudError,
    DtoError,
    EmailError,
    ExternalStorageError,
    ImageError,
    InternalStorageError,
    PDFError,
    RequestError,
    VoiceRecorderError
} from '@domain/errors';

import {
    AppMessages,
    AuthMessages,
    ExpoMessages,
    NetworkMessages,
    PermissionsMessages,
    SupabaseMessages
} from '@infrastructure/interfaces';

import { ToasterProps } from '@ui/components';

export class ToasterAdapter implements ToasterAdapterContract {
    private readonly appMessages: AppMessages;
    private readonly authMessages: AuthMessages;
    private readonly expoMessages: ExpoMessages;
    private readonly networkMessages: NetworkMessages;
    private readonly permissionsMessages: PermissionsMessages;
    private readonly supabaseMessages: SupabaseMessages;

    constructor(
        private readonly translationAdapter: TranslationAdapterContract,
        private readonly loggerService: LoggerServiceContract,
        private readonly messagesService: MessagesServiceContract
    ) {
        this.appMessages = this.messagesService.appMessages;
        this.authMessages = this.messagesService.authMessages;
        this.expoMessages = this.messagesService.expoMessages;
        this.networkMessages = this.messagesService.networkMessages;
        this.permissionsMessages = this.messagesService.permissionsMessages;
        this.supabaseMessages = this.messagesService.supabaseMessages;
    }

    private readonly defaultOptions: ToastOptions = {
        autoClose: true,
        duration: 3000
    }

    private generateOptions(options?: ToastOptions): ToastOptions {
        return {
            ...this.defaultOptions,
            ...options
        }
    }

    public showError(error: unknown, options?: ToastOptions): void {
        let msg: string = this.appMessages.UNEXPECTED_ERROR;

        if (error instanceof RequestError) {
            const supabaseMsg = this.supabaseMessages.auth[error.code as keyof typeof this.supabaseMessages.auth]
                || this.supabaseMessages.postgres[error.code as keyof typeof this.supabaseMessages.postgres]
                || this.appMessages.UNEXPECTED_ERROR;

            msg = supabaseMsg;
        }

        if (error instanceof CloudError) {
            const supabaseMsg = this.supabaseMessages.storage[error.message as keyof typeof this.supabaseMessages.storage]
                || this.appMessages.UNEXPECTED_ERROR;

            msg = supabaseMsg;
        }

        if (error instanceof DtoError) msg = error.message;
        if (error instanceof EmailError) msg = error.message;
        if (error instanceof ExternalStorageError) msg = error.message;

        if (error instanceof ImageError) {
            msg = this.expoMessages.picker[error?.code as keyof typeof this.expoMessages.picker]
                || this.appMessages.UNEXPECTED_ERROR;
        }

        if (error instanceof InternalStorageError) msg = error.message;
        if (error instanceof PDFError) msg = error.message;

        if (error instanceof VoiceRecorderError) {
            msg = this.expoMessages.voiceRecorder[error?.code as keyof typeof this.expoMessages.voiceRecorder]
                || this.appMessages.UNEXPECTED_ERROR;
        }

        if (msg.trim().length === 0) msg = this.appMessages.UNEXPECTED_ERROR;

        this.showToast(msg, options);

        const errorData = ('toJson' in (error as any) && typeof (error as any).toJson === 'function')
            ? (error as any).toJson()
            : { ...(error as Error), message: (error as Error).message }

        console.error(JSON.stringify(errorData, null, 2));
        this.loggerService.error(errorData);
    }

    public showFormError<FormErrors extends object>(formErrors: FormErrors, options?: ToastOptions): void {
        const values = Object.values(formErrors) as string[];
        this.showToast(values[0], options);
    }

    public showNetworkError(msg?: string, onDispatch?: () => void): void {
        onDispatch && onDispatch();
        this.showToast(msg || this.networkMessages.WIFI_HASNT_CONNEC_EXPLAIN);
    }

    public showPermissionsToast(): void {
        this.showToast(this.permissionsMessages.REQUEST, {
            autoClose: false,
            cancelAction: {
                label: this.translationAdapter.translate('forms.actions.cancel'),
                onPress: Toast.hide
            },
            confirmAction: {
                label: this.translationAdapter.translate('forms.actions.settings'),
                onPress: () => {
                    Linking.openSettings()
                    Toast.hide()
                }
            }
        });
    }

    public showToast(message: string, options?: ToastOptions): void {
        const mergedOptions = this.generateOptions(options);

        Toast.show({
            autoHide: mergedOptions.autoClose,
            bottomOffset: mergedOptions.bottomOffset,
            props: {
                cancelAction: mergedOptions.cancelAction,
                confirmAction: mergedOptions.confirmAction,
                style: mergedOptions.toastStyle,
                textStyle: mergedOptions.toastTextStyle
            } as Omit<ToasterProps, 'onClose' | 'message'>,
            text1: message,
            type: 'toast',
            visibilityTime: mergedOptions.duration,
        });
    }

    public showUnauthenticatedError(onDispatch?: () => void, options?: ToastOptions): void {
        onDispatch && onDispatch();
        this.showToast(this.authMessages.UNAUTHENTICATED, options);
    }
}