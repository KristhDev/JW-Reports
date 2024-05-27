/* Defining the interface for the props that will be passed to the ModalAction component. */
export interface ModalActionProps {
    onClose: () => void;
    onConfirm: () => void;
    reschedule: boolean;
}