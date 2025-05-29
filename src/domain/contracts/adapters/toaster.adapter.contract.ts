import { ToastOptions } from '@application/context';

export abstract class ToasterAdapterContract {
    public abstract showError(error: unknown, options?: ToastOptions): void;
    public abstract showFormError<FormErrors extends object>(formErrors: FormErrors, options?: ToastOptions): void;
    public abstract showNetworkError(msg?: string, onDispatch?: () => void): void;
    public abstract showPermissionsToast(): void;
    public abstract showToast(message: string, options?: ToastOptions): void;
    public abstract showUnauthenticatedError(onDispatch?: () => void, options?: ToastOptions): void;
}