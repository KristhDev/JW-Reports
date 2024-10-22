/* DTOs */
import { SignUpDto } from '@domain/dtos';

/* Interfaces */
import { SignUpData } from '@auth';

describe('Test in SignUpDto', () => {
    it('should convert data to SignUpDto', () => {
        const values: SignUpData = {
            name: 'Tester',
            surname: 'Unit',
            email: 'testerunit@gmail.com',
            password: 'tester-unit-1234',
        }

        const dto = SignUpDto.create(values);

        expect(dto).toBeInstanceOf(SignUpDto);

        expect(dto).toEqual({
            name: values.name,
            surname: values.surname,
            email: values.email,
            password: values.password,
            precursor: 'ninguno',
            hours_requirement: 0,
            hours_ldc: false
        });
    });
});