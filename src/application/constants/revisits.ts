import { TranslationAdapter } from '@infrastructure/adapters/translation.adapter';

export const revisitsMessages = {
    ABOUT_MIN_LENGTH: 'La información de la persona debe tener al menos 10 caracteres.',

    ABOUT_REQUIRED: TranslationAdapter.translate('forms.validations.required', {
        article: 'La',
        attribute: TranslationAdapter.translate('forms.fields.personAbout'),
        required: 'requerida'
    }),

    ADDED_SUCCESS: TranslationAdapter.translate('messages.success.added', {
        attribute: TranslationAdapter.translate('forms.fields.revisit'),
        article: 'la',
    }),

    ADDRESS_MIN_LENGTH: 'La dirección debe tener al menos 10 caracteres.',
    ADDRESS_REQUIRED: 'La dirección es requerida.',
    COMPLETED_SUCCESS: 'Ha marcado como completa su revisita correctamente.',

    DELETED_SUCCESS: TranslationAdapter.translate('messages.success.deleted', {
        attribute: TranslationAdapter.translate('forms.fields.revisit'),
        article: 'la',
    }),

    EXPORTED_SUCCESS: 'Ha exportado sus revisitas correctamente. El archivo se encuentra en la carpeta que ha seleccionado.',
    NEXT_VISIT_REQUIRED: 'La fecha de la último visita no puede estar vacía.',
    PERSON_MIN_LENGTH: 'El nombre de la persona debe tener al menos 2 caracteres.',
    PERSON_NAME_REQUIRED: 'El nombre de la persona es requerido.',

    UNSELECTED_COMPLETE: TranslationAdapter.translate('messages.errors.unSelected.completed', {
        attribute: TranslationAdapter.translate('forms.fields.revisit'),
        article: 'una',
        genderEnding: 'a'
    }),

    UNSELECTED_DELETE: TranslationAdapter.translate('messages.errors.unSelected.deleted', {
        attribute: TranslationAdapter.translate('forms.fields.revisit'),
        article: 'una',
        genderEnding: 'a'
    }),

    UNSELECTED_UPDATE: TranslationAdapter.translate('messages.errors.unSelected.updated', {
        attribute: TranslationAdapter.translate('forms.fields.revisit'),
        article: 'una',
        genderEnding: 'a'
    }),

    UPDATED_SUCCESS: 'Ha actualizado la revisita correctamente.',
}