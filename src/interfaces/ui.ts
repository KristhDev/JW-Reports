export type NavigationParamsList = {
    MainTabsBottomNavigation: undefined;
    SettingsStackNavigation: undefined;
    ProfileScreen: undefined;
    ResetPasswordScreen: undefined;
    AuthStackNavigation: undefined;
}

export type MainTabsBottomParamsList = {
    PreachingStackNavigation: undefined;
    RevistsStackNavigation: undefined;
    CoursesStackNavigation: undefined;
}

export interface LoadResourcesOptions {
    loadMore?: boolean;
    refresh?: boolean;
    search?: string;
}

export interface Pagination {
    from: number;
    to: number;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export type ItemOption = {
    label: string;
    value: string;
}