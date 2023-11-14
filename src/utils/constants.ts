/* Interfaces */
import { ItemOption } from '../interfaces';

/**
 * The headers of the table that will be displayed in the PreachingTable component
 */
export const TABLE_PREACHING_HEADERS = [
    'N°',
    'Día',
    'Hora de Inicio',
    'Hora de Fin'
];

/**
 * The precursors options to select
 */
export const PRECURSORS_OPTIONS: ItemOption[] = [
    { label: 'Ninguno', value: 'ninguno' },
    { label: 'Auxiliar', value: 'auxiliar' },
    { label: 'Regular', value: 'regular' },
    { label: 'Especial', value: 'especial' }
];

/**
 * The theme options to select
 */
export const THEME_OPTIONS: ItemOption[] = [
    { label: 'Modo predeterminado', value: 'default' },
    { label: 'Modo claro', value: 'light' },
    { label: 'Modo oscuro', value: 'dark' }
];

export const HOURS_REQUIREMENTS = {
    'ninguno': 0,
    'auxiliar': 30,
    'regular': 50,
    'especial': 90
}
