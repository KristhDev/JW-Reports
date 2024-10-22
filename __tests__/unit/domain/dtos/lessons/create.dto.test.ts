/* DTOs */
import { CreateLessonDto, CreateLessonDtoValues } from '@domain/dtos';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

describe('Test in CreateLessonDto', () => {
    it('should convert data to CreateLessonDto', () => {
        const values: CreateLessonDtoValues = {
            courseId: '81f41709-ed59-4c8e-9d19-1e6e32fa0a66',
            description: 'Laborum elit minim ad labore in veniam esse est quis aliqua voluptate sunt elit.',
            nextLesson: new Date()
        }

        const dto = CreateLessonDto.create(values);

        expect(dto).toBeInstanceOf(CreateLessonDto);
        expect(dto).toEqual({
            course_id: values.courseId,
            description: values.description,
            next_lesson: Time.format(values.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
        });
    });
});