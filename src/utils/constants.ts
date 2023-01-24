import { ItemOption } from '../interfaces/ui';

export const TABLE_PREACHING_HEADERS = [
    'Día',
    'H/I',
    'H/F',
    'Pub',
    'Vid',
    'Rev'
];

export const PRECURSORS_OPTIONS: ItemOption[] = [
    { label: 'Ninguno', value: 'ninguno' },
    { label: 'Auxiliar', value: 'auxiliar' },
    { label: 'Regular', value: 'regular' },
    { label: 'Especial', value: 'especial' }
];

export const THEME_OPTIONS: ItemOption[] = [
    { label: 'Modo predeterminado', value: 'default' },
    { label: 'Modo claro', value: 'light' },
    { label: 'Modo oscuro', value: 'dark' }
];