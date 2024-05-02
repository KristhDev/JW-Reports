import { object, ref, string } from 'yup';

/* Validation schema for register values */
export const registerFormSchema = object().shape({
    name: string()
        .min(2, 'El nombre debe tener al menos 2 caracteres.')
        .required('El nombre es requerido.'),

    surname: string()
        .min(2, 'Los apellidos deben tener al menos 2 caracteres.')
        .required('Los apellidos son requeridos.'),

    email: string()
        .email('Correo electrónico inválido.')
        .required('El correo electrónico es requerido.'),

    password: string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres.')
        .required('La contraseña es requerida.'),

    confirmPassword: string()
        .oneOf([ ref('password'), undefined ], 'Las contraseñas no coinciden.')
        .required('La confirmación de la contraseña es requerida.'),
});