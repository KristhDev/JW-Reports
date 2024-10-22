/* DTOs */
import { CompleteRevisitDto } from '@domain/dtos';

describe('Test in CompleteRevisitDto', () => {
    it('should convert data to CompleteRevisitDto', () => {
        const dto = CompleteRevisitDto.create(true);

        expect(dto).toBeInstanceOf(CompleteRevisitDto);
        expect(dto).toEqual({
            done: true,
            updated_at: expect.any(String)
        });
    });
});