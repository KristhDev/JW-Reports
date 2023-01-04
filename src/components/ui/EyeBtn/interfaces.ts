import { Dispatch, SetStateAction } from 'react';

export interface EyeBtnProps {
    onToggle: Dispatch<SetStateAction<boolean>>;
    value: boolean;
}