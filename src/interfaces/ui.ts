export type NavigationParamsList = {
    MainTabsBottomNavigation: undefined;
    SettingsStackNavigation: undefined;
    AuthStackNavigation: undefined;
}

export type MainTabsBottomParamsList = {
    PreachingStackNavigation: undefined;
    SearchStackNavigation: undefined;
    RevistsStackNavigation: undefined;
    CoursesStackNavigation: undefined;
}

export interface Pagination {
    from: number;
    to: number;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}