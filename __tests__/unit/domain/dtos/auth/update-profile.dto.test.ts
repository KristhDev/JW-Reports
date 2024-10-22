/* DTOs */
import { UpdateProfileDto } from '@domain/dtos';

/* Interfaces */
import { ProfileData } from '@auth';

describe('Test in UpdateProfileDto', () => {
    it('should convert data to UpdateProfileDto', () => {
        const values: ProfileData = {
            name: 'Tester',
            surname: 'Unit',
            precursor: 'regular',
            hoursRequirement: 50,
            hoursLDC: true
        }

        const dto = UpdateProfileDto.create(values);

        expect(dto).toBeInstanceOf(UpdateProfileDto);

        expect(dto).toEqual({
            name: values.name,
            surname: values.surname,
            precursor: values.precursor,
            hours_requirement: values.hoursRequirement,
            hours_ldc: values.hoursLDC
        });
    });
});