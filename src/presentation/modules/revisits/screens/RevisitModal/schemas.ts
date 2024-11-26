import { date, object, string } from 'yup';

/* Validation schema for revisit */
export const newRevisitFormSchema = object().shape({
    about: string()
        .min(10, 'La información de la persona debe tener al menos 10 caracteres.')
        .required('La información de la persona es requerida.'),

    nextVisit: date()
        .required('La fecha de la próxima visita no puede estar vacía'),
});