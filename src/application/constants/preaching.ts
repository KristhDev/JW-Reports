import { ParticipateInMinistry } from '@infrasturcture/interfaces';

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
    ADDED_SUCCESS: 'Ha agregado el día de predicación correctamente.',
    DAY_REQUIRED: 'El día no puede estar vacío.',
    DELETED_SUCCESS: 'Ha eliminado el día de predicación correctamente.',
    EXPORTED_SUCCESS: 'Ha exportado sus informaciones de predicación correctamente. El archivo se encuentra en la carpeta que ha seleccionado.',
    FINAL_HOUR_REQUIRED: 'La hora final no puede estar vacía.',
    INIT_HOUR_GREATER_THAN_FINAL: 'La hora inicial no puede ser mayor que la hora final.',
    INIT_HOUR_REQUIRED: 'La hora inicial no puede estar vacía.',
    MONTHLY_HOURS_REQUIRED_DONE: '¡Excelente! has cumplido con tu requerimiento de horas por mes.',
    UNSELECTED_DELETE: 'No hay un día de predicación seleccionado para eliminar.',
    UNSELECTED_UPDATE: 'No hay un día de predicación seleccionado para actualizar.',
    UPDATED_SUCCESS: 'Ha actualizado el día de predicación correctamente.',
    WEEKLY_HOURS_REQUIRED_DONE: '¡Excelente! ha cumplido con su requerimiento de horas por semana.'
}

export const MINISTRY_PARTICIPATIONS: { label: string, value: ParticipateInMinistry }[] = [
    { label: 'Si', value: 'si' },
    { label: 'No', value: 'no' }
];