export interface UtilFunctions {
    onSuccess?: () => void,
    onFinish?: () => void
}

export interface FormActions {
    setSubmitting?: (isSubmitting: boolean) => void;
    resetForm?: () => void;
}