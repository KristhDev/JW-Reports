/* DTOs */
import { UpdateLessonDto, UpdateLessonDtoValues } from '@domain/dtos';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

describe('Test in UpdateLessonDto', () => {
    it('should convert data to UpdateLessonDto', () => {
        const values: UpdateLessonDtoValues = {
            description: 'Laborum elit minim ad labore in veniam esse est quis aliqua voluptate sunt elit.',
            nextLesson: new Date()
        }

        const dto = UpdateLessonDto.create(values);

        expect(dto).toBeInstanceOf(UpdateLessonDto);
        expect(dto).toEqual({
            description: values.description,
            next_lesson: Time.format(values.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            updated_at: expect.any(String)
        });
    });
});