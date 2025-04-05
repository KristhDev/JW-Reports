/* Config */
import { translationAdapter } from '@config/di';

export const lessonsMessages = {
    ADDED_SUCCESS: translationAdapter.translate('messages.success.added', {
        attribute: translationAdapter.translate('forms.fields.lesson'),
        article: 'la',
    }),

    DELETED_SUCCESS: translationAdapter.translate('messages.success.deleted', {
        attribute: translationAdapter.translate('forms.fields.lesson'),
        article: 'la',
    }),

    DESCRIPTION_MIN_LENGTH: 'El contenido de la clase debe tener al menos 10 caracteres.',

    DESCRIPTION_REQUIRED: translationAdapter.translate('forms.validations.required', {
        article: 'El',
        attribute: translationAdapter.translate('forms.fields.description'),
        required: 'requerido'
    }),

    FINISHED_SUCCESS: 'Has terminado la clase correctamente.',
    NEXT_LESSON_REQUIRED: 'La fecha de la próxima clase no puede estar vacía.',
    RESTARTED_SUCCESS: 'Has reprogrado la clase correctamente.',
    SUSPENDED_OR_FINISHED: 'No pudes terminar o reprogramar de nuevo una clase de un curso suspendido o terminado.',

    UNSELECTED_DELETE: translationAdapter.translate('messages.errors.unSelected.deleted', {
        attribute: translationAdapter.translate('forms.fields.lesson'),
        article: 'una',
        genderEnding: 'a'
    }),

    UNSELECTED_UPDATE: translationAdapter.translate('messages.errors.unSelected.updated', {
        attribute: translationAdapter.translate('forms.fields.lesson'),
        article: 'una',
        genderEnding: 'a'
    }),

    UNSELECTED: translationAdapter.translate('messages.errors.unSelected.empty', {
        attribute: translationAdapter.translate('forms.fields.lesson'),
        article: 'una',
        genderEnding: 'a'
    }),

    UPDATED_SUCCESS: 'Has actualizado la clase correctamente.'
}