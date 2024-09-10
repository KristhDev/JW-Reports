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
    ADDED_SUCCESS: 'Has agregado tu día de predicación correctamente.',
    DAY_REQUIRED: 'El día no puede estar vacío.',
    DELETED_SUCCESS: 'Has eliminado tu día de predicación correctamente.',
    FINAL_HOUR_REQUIRED: 'La hora final no puede estar vacía.',
    INIT_HOUR_GREATER_THAN_FINAL: 'La hora inicial no puede ser mayor que la hora final.',
    INIT_HOUR_REQUIRED: 'La hora inicial no puede estar vacía.',
    UNSELECTED_DELETE: 'No hay un dia de predicación seleccionado para eliminar.',
    UNSELECTED_UPDATE: 'No hay un dia de predicación seleccionado para actualizar.',
    UPDATED_SUCCESS: 'Has actualizado tu día de predicación correctamente.',
}