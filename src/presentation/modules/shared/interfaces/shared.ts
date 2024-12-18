export interface UtilFunctions {
    onSuccess?: () => void,
    onFinish?: () => void
}

export interface FormActions {
    setSubmitting?: (isSubmitting: boolean) => void;
    resetForm?: () => void;
}

export type SettingsStackParamsList = {
    SettingsScreen: undefined;
    ProfileScreen: undefined;
    CredentialsScreen: undefined;
    ExportDataScreen: undefined;
    FeedbackScreen: undefined;
    ReportErrorScreen: undefined;
}