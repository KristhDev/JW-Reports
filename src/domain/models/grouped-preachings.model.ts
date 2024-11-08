import { PreachingEntity } from '@domain/entities';

export type GroupedPreachingsModel = {
    month: string;
    year: number;
    preachings: PreachingEntity[];
}