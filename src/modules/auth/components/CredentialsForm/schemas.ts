import { object, ref, string } from 'yup';

/* Validation schema for new email */
export const emailFormSchema = (email: string) => object().shape({
    email: string()
        .email('Correo electrónico inválido.')
        .notOneOf([ email ], 'Para actualizar tu correo debes cambiarlo.')
        .required('El correo electrónico es requerido.')
});


/* Validation schema for new password */
export const passwordFormSchema = object().shape({
    password: string()
        .min(6, 'La nueva contraseña debe tener al menos 6 caracteres.')
        .required('La nueva contraseña no puede estar vacía.'),

    confirmPassword: string()
        .oneOf([ ref('password'), undefined ], 'Las contraseñas no coinciden.')
        .required('La confirmación de la contraseña es requerida.'),
});