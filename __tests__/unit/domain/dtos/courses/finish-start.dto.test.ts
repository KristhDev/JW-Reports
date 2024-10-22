/* DTOs */
import { FinishOrStartCourseDto } from '@domain/dtos';

describe('Test in FinishOrStartCourseDto', () => {
    it('should convert data to FinishOrStartCourseDto', () => {
        const dto = FinishOrStartCourseDto.create(true);

        expect(dto).toBeInstanceOf(FinishOrStartCourseDto);
        expect(dto).toEqual({
            finished: true,
            updated_at: expect.any(String)
        });
    });
});