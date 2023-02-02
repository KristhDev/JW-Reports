import { Dispatch, SetStateAction } from 'react';

/* Defining the props that the component will receive. */
export interface EyeBtnProps {
    onToggle: Dispatch<SetStateAction<boolean>>;
    value: boolean;
}