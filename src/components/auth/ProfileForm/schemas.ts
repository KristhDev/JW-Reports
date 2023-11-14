import { object, string } from 'yup';

/* Validation schema for profile values */
export const profileFormSchema = object().shape({
    name: string()
        .min(2, 'El nombre debe tener al menos 2 caracteres.')
        .required('El nombre es requerido.'),

    surname: string()
        .min(2, 'Los apellidos deben tener al menos 2 caracteres.')
        .required('Los apellidos son requeridos.'),

    precursor: string()
        .oneOf([ 'ninguno', 'auxiliar', 'regular', 'especial' ], 'Por favor seleccione una opción de precursor.')
        .required('El campo precursor es requerido.')
});