export interface HeaderButtonsProps {
    logoutButton?: boolean;
    changeMonthButton?: boolean;
    settingsButtons?: boolean;

    // Edit props
    editButton?: boolean;
    onPressEditButton?: () => void;

    // Delete props
    deleteButton?: boolean;
    deleteModalText?: string;
    isDeleteModalLoading?: boolean;
    showDeleteModal?: boolean;
    onShowDeleteModal?: () => void;
    onCloseDeleteModal?: () => void;
    onConfirmDeleteModal?: () => void;
}