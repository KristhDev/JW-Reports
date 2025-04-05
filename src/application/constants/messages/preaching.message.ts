/* Config */
import { translationAdapter } from '@config/di';

export const preachingMessages = {
    ADDED_SUCCESS: translationAdapter.translate('messages.success.added', {
        attribute: translationAdapter.translate('forms.fields.preachingDay'),
        article: 'el',
    }),

    DAY_REQUIRED: translationAdapter.translate('forms.validations.empty', {
        article: 'El',
        attribute: translationAdapter.translate('forms.fields.day'),
        required: 'vací́o'
    }),

    DELETED_SUCCESS: translationAdapter.translate('messages.success.deleted', {
        attribute: translationAdapter.translate('forms.fields.preachingDay'),
        article: 'el',
    }),

    EXPORTED_SUCCESS: 'Ha exportado sus informaciones de predicación correctamente. El archivo se encuentra en la carpeta que ha seleccionado.',
    FINAL_HOUR_REQUIRED: 'La hora final no puede estar vacía.',
    INIT_HOUR_GREATER_THAN_FINAL: 'La hora inicial no puede ser mayor que la hora final.',
    INIT_HOUR_REQUIRED: 'La hora inicial no puede estar vacía.',
    MONTHLY_HOURS_REQUIRED_DONE: '¡Excelente! has cumplido con tu requerimiento de horas por mes.',

    UNSELECTED_DELETE: translationAdapter.translate('messages.errors.unSelected.deleted', {
        attribute: translationAdapter.translate('forms.fields.preachingDay'),
        article: 'un',
        genderEnding: 'o'
    }),

    UNSELECTED_UPDATE: translationAdapter.translate('messages.errors.unSelected.updated', {
        attribute: translationAdapter.translate('forms.fields.preachingDay'),
        article: 'un',
        genderEnding: 'o'
    }),

    UPDATED_SUCCESS: 'Ha actualizado el día de predicación correctamente.',
    WEEKLY_HOURS_REQUIRED_DONE: '¡Excelente! ha cumplido con su requerimiento de horas por semana.'
}
