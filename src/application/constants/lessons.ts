import { TranslationAdapter } from '@infrastructure/adapters/translation.adapter';

export const lessonsMessages = {
    ADDED_SUCCESS: TranslationAdapter.translate('messages.success.added', {
        attribute: TranslationAdapter.translate('forms.fields.lesson'),
        article: 'la',
    }),

    DELETED_SUCCESS: TranslationAdapter.translate('messages.success.deleted', {
        attribute: TranslationAdapter.translate('forms.fields.lesson'),
        article: 'la',
    }),

    DESCRIPTION_MIN_LENGTH: 'El contenido de la clase debe tener al menos 10 caracteres.',

    DESCRIPTION_REQUIRED: TranslationAdapter.translate('forms.validations.required', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.description'),
        required: 'requerido'
    }),

    FINISHED_SUCCESS: 'Has terminado la clase correctamente.',
    NEXT_LESSON_REQUIRED: 'La fecha de la próxima clase no puede estar vacía.',
    RESTARTED_SUCCESS: 'Has reprogrado la clase correctamente.',
    SUSPENDED_OR_FINISHED: 'No pudes terminar o reprogramar de nuevo una clase de un curso suspendido o terminado.',

    UNSELECTED_DELETE: TranslationAdapter.translate('messages.errors.unSelected.deleted', {
        attribute: TranslationAdapter.translate('forms.fields.lesson'),
        article: 'una',
        genderEnding: 'a'
    }),

    UNSELECTED_UPDATE: TranslationAdapter.translate('messages.errors.unSelected.updated', {
        attribute: TranslationAdapter.translate('forms.fields.lesson'),
        article: 'una',
        genderEnding: 'a'
    }),

    UNSELECTED: TranslationAdapter.translate('messages.errors.unSelected.empty', {
        attribute: TranslationAdapter.translate('forms.fields.lesson'),
        article: 'una',
        genderEnding: 'a'
    }),

    UPDATED_SUCCESS: 'Has actualizado la clase correctamente.'
}