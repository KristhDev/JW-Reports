/* Defining the props that the component will receive. */
export interface HeaderButtonsProps {
    logoutButton?: boolean;
    changeMonthButton?: boolean;
    settingsButtons?: boolean;

    // Edit props
    editButton?: boolean;
    onPressEditButton?: () => void;

    // Delete props
    deleteButton?: boolean;
    onPressDeleteButton?: () => void;
}