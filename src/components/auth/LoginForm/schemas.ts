import { object, string } from 'yup';

/* Validation schema for login values (email and password) */
export const loginFormSchema = object().shape({
    email: string()
        .email('Correo electrónico inválido.')
        .required('El correo electrónico es requerido.'),

    password: string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres.')
        .required('La contraseña es requerida.')
});