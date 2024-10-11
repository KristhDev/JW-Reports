import { object, string } from 'yup';

/* Validation schema of error */
export const reportErrorFormSchema = object().shape({
    message: string()
        .min(10, 'El mensaje debe tener al menos 10 caracteres.')
        .required('El mensaje es requerido.')
});