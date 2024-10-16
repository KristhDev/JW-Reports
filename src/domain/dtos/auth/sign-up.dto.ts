/* Interfaces */
import { SignUpData } from '@auth';
import { Precursor } from '@infrasturcture/interfaces';

export class SignUpDto {
    private constructor(
        public readonly name: string,
        public readonly surname: string,
        public readonly email: string,
        public readonly password: string,
        public readonly precursor: Precursor,
        public readonly hours_requirement: number,
        public readonly hours_ldc: boolean
    ) {}

    public static create(values: SignUpData): SignUpDto {
        return new SignUpDto(
            values.name,
            values.surname,
            values.email,
            values.password,
            'ninguno',
            0,
            false
        );
    }
}