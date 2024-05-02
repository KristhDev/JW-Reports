import { date, object, string } from 'yup';

/* Validation schema of revisit */
export const revisitFormSchema = object().shape({
    personName: string()
        .min(2, 'El nombre de la persona debe tener al menos 2 caracteres.')
        .required('El nombre de la persona es requerido.'),

    about: string()
        .min(10, 'La información de la persona debe tener al menos 10 caracteres.')
        .required('La información de la persona es requerida.'),

    address: string()
        .min(10, 'La dirección debe tener al menos 10 caracteres.')
        .required('La dirección es requerida.'),

    nextVisit: date()
        .required('La fecha de la próxima visita no puede estar vacía'),
});