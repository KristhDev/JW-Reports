/* Interfaces */
import { ItemOption } from '../interfaces/ui';

/**
 * The headers of the table that will be displayed in the PreachingTable component
 */
export const TABLE_PREACHING_HEADERS = [
    'Día',
    'H/I',
    'H/F',
    'Pub',
    'Vid',
    'Rev'
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