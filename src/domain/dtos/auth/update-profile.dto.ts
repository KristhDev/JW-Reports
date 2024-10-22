/* Interfaces */
import { ProfileData } from '@auth';
import { Precursor } from '@infrasturcture/interfaces';

export class UpdateProfileDto {
    private constructor(
        public readonly name: string,
        public readonly surname: string,
        public readonly precursor: Precursor,
        public readonly hours_requirement: number,
        public readonly hours_ldc: boolean
    ) {}

    /**
     * Creates an UpdateProfileDto from the given ProfileData.
     *
     * @param {ProfileData} values - The ProfileData to create the UpdateProfileDto from.
     * @return {UpdateProfileDto} The created UpdateProfileDto.
     */
    public static create(values: ProfileData): UpdateProfileDto {
        return new UpdateProfileDto(
            values.name,
            values.surname,
            values.precursor,
            values.hoursRequirement,
            values.hoursLDC
        );
    }
}