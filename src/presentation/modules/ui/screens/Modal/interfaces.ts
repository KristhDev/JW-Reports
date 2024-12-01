import { ReactNode } from 'react';

/* Defining the props that the component will take. */
export interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
}