/* Config */
import { translationAdapter } from '@config/di';

export const revisitsMessages = {
    ABOUT_MIN_LENGTH: 'La información de la persona debe tener al menos 10 caracteres.',

    ABOUT_REQUIRED: translationAdapter.translate('forms.validations.required', {
        article: 'La',
        attribute: translationAdapter.translate('forms.fields.personAbout'),
        required: 'requerida'
    }),

    ADDED_SUCCESS: translationAdapter.translate('messages.success.added', {
        attribute: translationAdapter.translate('forms.fields.revisit'),
        article: 'la',
    }),

    ADDRESS_MIN_LENGTH: 'La dirección debe tener al menos 10 caracteres.',
    ADDRESS_REQUIRED: 'La dirección es requerida.',
    COMPLETED_SUCCESS: 'Ha marcado como completa su revisita correctamente.',

    DELETED_SUCCESS: translationAdapter.translate('messages.success.deleted', {
        attribute: translationAdapter.translate('forms.fields.revisit'),
        article: 'la',
    }),

    EXPORTED_SUCCESS: 'Ha exportado sus revisitas correctamente. El archivo se encuentra en la carpeta que ha seleccionado.',
    NEXT_VISIT_REQUIRED: 'La fecha de la último visita no puede estar vacía.',
    PERSON_MIN_LENGTH: 'El nombre de la persona debe tener al menos 2 caracteres.',
    PERSON_NAME_REQUIRED: 'El nombre de la persona es requerido.',

    UNSELECTED_COMPLETE: translationAdapter.translate('messages.errors.unSelected.completed', {
        attribute: translationAdapter.translate('forms.fields.revisit'),
        article: 'una',
        genderEnding: 'a'
    }),

    UNSELECTED_DELETE: translationAdapter.translate('messages.errors.unSelected.deleted', {
        attribute: translationAdapter.translate('forms.fields.revisit'),
        article: 'una',
        genderEnding: 'a'
    }),

    UNSELECTED_UPDATE: translationAdapter.translate('messages.errors.unSelected.updated', {
        attribute: translationAdapter.translate('forms.fields.revisit'),
        article: 'una',
        genderEnding: 'a'
    }),

    UPDATED_SUCCESS: 'Ha actualizado la revisita correctamente.',
}