/* DTOs */
import { CreateCourseDto, CreateCourseDtoValues } from '@domain/dtos';

describe('Test in CreateCourseDto', () => {
    it('should convert data to CreateCourseDto', () => {
        const values: CreateCourseDtoValues = {
            userId: '32756768-123c-4f09-9791-eece0c589b9c',
            personName: 'Linnie Abshire',
            personAbout: 'Sint Lorem ipsum irure aliquip dolore.',
            personAddress: 'Sit duis ipsum ea occaecat sit voluptate laborum.',
            publication: 'laudantium'
        }

        const dto = CreateCourseDto.create(values);

        expect(dto).toBeInstanceOf(CreateCourseDto);
        expect(dto).toEqual({
            user_id: values.userId,
            person_name: values.personName,
            person_about: values.personAbout,
            person_address: values.personAddress,
            publication: values.publication
        });
    });
});