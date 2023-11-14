import { object, string } from 'yup';

 /* Validation schema for course */
export const courseFormSchema = object().shape({
    personName: string()
        .min(2, 'El nombre de la persona debe tener al menoss 2 caracteres.')
        .required('El nombre de la persona es requerido.'),

    personAbout: string()
        .min(10, 'La información de la persona debe tener al menos 10 caracteres.')
        .required('La información de la persona es requerida.'),

    personAddress: string()
        .min(10, 'La dirección debe tener al menos 10 caracteres.')
        .required('La dirección es requerida.'),

    publication: string()
        .min(5, 'La publicación de estudio debe tener al menos 5 caracteres.')
        .required('La publicación de estudio no puede estar vacía'),
});