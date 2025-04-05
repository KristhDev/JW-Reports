import { ParticipateInMinistry } from '@infrastructure/interfaces';

/**
 * The headers of the table that will be displayed in the PreachingTable component
 */
export const TABLE_PREACHING_HEADERS = [
    'N°',
    'Día',
    'Hora de Inicio',
    'Hora de Fin'
] as const;

export const HOURS_REQUIREMENTS = {
    'ninguno': 0,
    'auxiliar': 30,
    'regular': 50,
    'especial': 90
} as const;


export const MINISTRY_PARTICIPATIONS: { label: string, value: ParticipateInMinistry }[] = [
    { label: 'Si', value: 'si' },
    { label: 'No', value: 'no' }
] as const;
