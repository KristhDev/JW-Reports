export type ModalActionsProps = {
    showCancelButton?: false;
    showConfirmButton?: false;

    onCancel?: () => void;
    onConfirm?: () => void;

    confirmTextButton?: string;
    cancelButtonText?: string;
} | {
    showCancelButton: true;
    showConfirmButton?: false;

    onCancel: () => void;
    onConfirm?: () => void;

    cancelButtonText: string;
    confirmTextButton?: string;
} | {
    showCancelButton?: false;
    showConfirmButton: true;

    onCancel?: () => void;
    onConfirm: () => void;

    confirmTextButton: string;
    cancelButtonText?: string;
} | {
    showCancelButton: true;
    showConfirmButton: true;

    onCancel: () => void;
    onConfirm: () => void;

    cancelButtonText: string;
    confirmTextButton: string;
}