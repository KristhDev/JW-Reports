import { RevisitEntity } from '@domain/entities';

export interface RevisitsTemplateOptions {
    fullName: string;
    revisits: RevisitEntity[];
}