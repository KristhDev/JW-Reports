export interface UtilFunctions {
    onFail?: () => void
    onFinish?: () => void,
    onSuccess?: () => void,
}

export interface FormActions {
    setSubmitting?: (isSubmitting: boolean) => void;
    resetForm?: () => void;
}