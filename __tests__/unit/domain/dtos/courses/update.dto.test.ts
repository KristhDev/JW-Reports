/* DTOs */
import { UpdateCourseDto, UpdateCourseDtoValues } from '@domain/dtos';

describe('Test in UpdateCourseDto', () => {
    it('should convert data to UpdateCourseDto', () => {
        const values: UpdateCourseDtoValues = {
            personName: 'Linnie Abshire',
            personAbout: 'Sint Lorem ipsum irure aliquip dolore.',
            personAddress: 'Sit duis ipsum ea occaecat sit voluptate laborum.',
            publication: 'laudantium'
        }

        const dto = UpdateCourseDto.create(values);

        expect(dto).toBeInstanceOf(UpdateCourseDto);
        expect(dto).toEqual({
            person_name: values.personName,
            person_about: values.personAbout,
            person_address: values.personAddress,
            publication: values.publication,
            updated_at: expect.any(String)
        });
    });
});