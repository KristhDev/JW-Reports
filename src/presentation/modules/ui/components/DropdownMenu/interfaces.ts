export interface DropdownMenuItem {
    label: string;
    onPress: () => void;
}

export interface DropdownMenuProps {
    open: boolean;
    onClose: () => void;
    items: DropdownMenuItem[];
}