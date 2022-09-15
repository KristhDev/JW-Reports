import { Dispatch, SetStateAction } from 'react';

export interface Props {
    onToggle: Dispatch<SetStateAction<boolean>>;
    value: boolean;
}