/**
 * NavigationParamsList is a type that is an object with a bunch of properties, each of which is a type
 * that is an object with a single property called undefined.
 * @property MainTabsBottomNavigation - undefined;
 * @property SettingsStackNavigation - undefined;
 * @property ProfileScreen - undefined;
 * @property ResetPasswordScreen - undefined;
 * @property AuthStackNavigation - undefined;
 */
export type NavigationParamsList = {
    MainTabsBottomNavigation: undefined;
    SettingsStackNavigation: undefined;
    ProfileScreen: undefined;
    ResetPasswordScreen: undefined;
    AuthStackNavigation: undefined;
}

/**
 * MainTabsBottomParamsList is a type that is an object with three properties, each of which is a type
 * that is a function that takes undefined and returns undefined.
 * @property PreachingStackNavigation - undefined;
 * @property RevistsStackNavigation - undefined;
 * @property CoursesStackNavigation - undefined;
 */
export type MainTabsBottomParamsList = {
    PreachingStackNavigation: undefined;
    RevistsStackNavigation: undefined;
    CoursesStackNavigation: undefined;
}

/* Defining an interface called LoadResourcesOptions. */
export interface LoadResourcesOptions {
    loadMore?: boolean;
    refresh?: boolean;
    search?: string;
}

/* Defining an interface called Pagination. */
export interface Pagination {
    from: number;
    to: number;
}

/* Defining an interface called ModalProps. */
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * ItemOption is an object with a label property of type string and a value property of type string.
 * @property {string} label - The text that will be displayed in the dropdown
 * @property {string} value - The value of the item.
 */
export type ItemOption = {
    label: string;
    value: string;
}

/* Defining an interface called StorageError. */
export interface StorageError {
    message: string;
    name: string;
    stack?: string;
}
