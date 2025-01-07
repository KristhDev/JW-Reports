/* DTOs */
import { CreateRevisitDto, CreateRevisitDtoValues } from '@domain/dtos';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

describe('Test in CreateRevisitDto', () => {
    it('should convert data to CreateRevisitDto', () => {
        const values: CreateRevisitDtoValues = {
            userId: '9a7e28f4-a576-4763-8efe-cb3c5c982be7',
            personName: 'Linnie Abshire',
            about: 'Laborum elit minim ad labore in veniam esse est quis aliqua voluptate sunt elit.',
            address: 'Sint Lorem ipsum irure aliquip dolore.',
            nextVisit: new Date(),
        }

        const dto = CreateRevisitDto.create(values);

        expect(dto).toBeInstanceOf(CreateRevisitDto);
        expect(dto).toEqual({
            user_id: values.userId,
            person_name: values.personName,
            about: values.about,
            address: values.address,
            next_visit: Time.format(values.nextVisit, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            photo: null
        });
    });
});