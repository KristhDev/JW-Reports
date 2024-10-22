/* DTOs */
import { UpdateRevisitDto, UpdateRevisitDtoValues } from '@domain/dtos';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

describe('Test in UpdateRevisitDto', () => {
    it('should convert data to UpdateRevisitDto', () => {
        const values: UpdateRevisitDtoValues = {
            personName: 'Linnie Abshire',
            about: 'Laborum elit minim ad labore in veniam esse est quis aliqua voluptate sunt elit.',
            address: 'Sint Lorem ipsum irure aliquip dolore.',
            nextVisit: new Date(),
        }

        const dto = UpdateRevisitDto.create(values);

        expect(dto).toBeInstanceOf(UpdateRevisitDto);
        expect(dto).toEqual({
            person_name: values.personName,
            about: values.about,
            address: values.address,
            next_visit: Time.format(values.nextVisit, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            photo: null,
            updated_at: expect.any(String)
        });
    });
});