/* Interfaces */
import { Precursor } from '@infrastructure/interfaces';

export interface UserEntity {
    id: string;
    name: string;
    surname: string;
    email: string;
    precursor: Precursor;
    hoursRequirement: number;
    hoursLDC: boolean;
    createdAt: string;
    updatedAt: string;
}