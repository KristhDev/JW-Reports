/* DTOs */
import { FinishOrStartDtoValues, FinishOrStartLessonDto } from '@domain/dtos';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

describe('Test in FinishOrStartLessonDto', () => {
    it('should convert data to FinishOrStartLessonDto', () => {
        const values: FinishOrStartDtoValues = { done: true, nextLesson: new Date() }
        const dto = FinishOrStartLessonDto.create(values);

        expect(dto).toBeInstanceOf(FinishOrStartLessonDto);
        expect(dto).toEqual({
            done: true,
            next_lesson: Time.format(values.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            updated_at: expect.any(String)
        });
    });
});