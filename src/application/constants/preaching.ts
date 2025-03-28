import { TranslationAdapter } from '@infrastructure/adapters/translation.adapter';
import { ParticipateInMinistry } from '@infrastructure/interfaces';

/**
 * The headers of the table that will be displayed in the PreachingTable component
 */
export const TABLE_PREACHING_HEADERS = [
    'N°',
    'Día',
    'Hora de Inicio',
    'Hora de Fin'
];

export const HOURS_REQUIREMENTS = {
    'ninguno': 0,
    'auxiliar': 30,
    'regular': 50,
    'especial': 90
}

export const preachingMessages = {
    ADDED_SUCCESS: TranslationAdapter.translate('messages.success.added', {
        attribute: TranslationAdapter.translate('forms.fields.preachingDay'),
        article: 'el',
    }),

    DAY_REQUIRED: TranslationAdapter.translate('forms.validations.empty', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.day'),
        required: 'vací́o'
    }),

    DELETED_SUCCESS: TranslationAdapter.translate('messages.success.deleted', {
        attribute: TranslationAdapter.translate('forms.fields.preachingDay'),
        article: 'el',
    }),

    EXPORTED_SUCCESS: 'Ha exportado sus informaciones de predicación correctamente. El archivo se encuentra en la carpeta que ha seleccionado.',
    FINAL_HOUR_REQUIRED: 'La hora final no puede estar vacía.',
    INIT_HOUR_GREATER_THAN_FINAL: 'La hora inicial no puede ser mayor que la hora final.',
    INIT_HOUR_REQUIRED: 'La hora inicial no puede estar vacía.',
    MONTHLY_HOURS_REQUIRED_DONE: '¡Excelente! has cumplido con tu requerimiento de horas por mes.',

    UNSELECTED_DELETE: TranslationAdapter.translate('messages.errors.unSelected.deleted', {
        attribute: TranslationAdapter.translate('forms.fields.preachingDay'),
        article: 'un',
        genderEnding: 'o'
    }),

    UNSELECTED_UPDATE: TranslationAdapter.translate('messages.errors.unSelected.updated', {
        attribute: TranslationAdapter.translate('forms.fields.preachingDay'),
        article: 'un',
        genderEnding: 'o'
    }),

    UPDATED_SUCCESS: 'Ha actualizado el día de predicación correctamente.',
    WEEKLY_HOURS_REQUIRED_DONE: '¡Excelente! ha cumplido con su requerimiento de horas por semana.'
}

export const MINISTRY_PARTICIPATIONS: { label: string, value: ParticipateInMinistry }[] = [
    { label: 'Si', value: 'si' },
    { label: 'No', value: 'no' }
];