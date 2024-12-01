/**
 * NavigationParamsList is a type that is an object with a bunch of properties, each of which is a type
 * that is an object with a single property called undefined.
 *
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
 *
 * @property PreachingStackNavigation - undefined;
 * @property RevisitsStackNavigation - undefined;
 * @property CoursesStackNavigation - undefined;
 */
export type MainTabsBottomParamsList = {
    PreachingStackNavigation: undefined;
    RevisitsStackNavigation: undefined;
    CoursesStackNavigation: undefined;
}

/**
 * Defining an interface called LoadResourcesOptions.
 *
 * @property {boolean} loadMore - If the load more button should be shown.
 * @property {boolean} refresh - If the refresh button should be shown.
 * @property {string} search - The search term.
 */
export interface LoadResourcesOptions {
    loadMore?: boolean;
    refresh?: boolean;
    search?: string;
}

/**
 * Defining an interface called ModalProps.
 *
 * @property {boolean} isOpen - If the modal is open or not.
 * @property {() => void} onClose - The function that will be called when the modal is closed.
 */
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}