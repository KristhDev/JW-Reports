/* DTOs */
import { ActiveOrSuspendCourseDto } from '@domain/dtos';

describe('Test in ActiveOrSuspendCourseDto', () => {
    it('should convert data to ActiveOrSuspendCourseDto', () => {
        const dto = ActiveOrSuspendCourseDto.create(true);

        expect(dto).toBeInstanceOf(ActiveOrSuspendCourseDto);
        expect(dto).toEqual({
            suspended: true,
            updated_at: expect.any(String)
        });
    });
});