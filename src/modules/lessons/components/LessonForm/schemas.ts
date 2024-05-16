import { date, object, string } from 'yup';

/* Validation schema for lesson */
export const lessonFormSchema = object().shape({
    description: string()
        .min(10, 'El contenido de la clase debe tener al menos 10 caracteres.')
        .required('El contenido de la clase es requerido.'),
    nextLesson: date()
        .required('La fecha de la próxima clase no puede estar vacía.'),
});