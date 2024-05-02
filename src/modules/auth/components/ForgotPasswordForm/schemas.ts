import { object, string } from 'yup';

/* Validation schema to forgot password */
export const forgotPasswordFormSchema = object().shape({
    email: string()
        .email('Correo electrónico inválido.')
        .required('El correo electrónico es requerido.')
});