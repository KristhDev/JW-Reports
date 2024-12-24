/* Constants */
import { precursors } from '@application/constants';

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

    /**
     * Creates a SignUpDto from the given SignUpData.
     *
     * @param {SignUpData} values - The SignUpData to create the SignUpDto from.
     * @return {SignUpDto} The created SignUpDto.
     */
    public static create(values: SignUpData): SignUpDto {
        return new SignUpDto(
            values.name,
            values.surname,
            values.email,
            values.password,
            precursors.NINGUNO,
            0,
            false
        );
    }
}