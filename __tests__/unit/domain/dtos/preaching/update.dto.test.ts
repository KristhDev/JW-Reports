/* DTOs */
import { UpdatePreachingDto, UpdatePreachingDtoValues } from '@domain/dtos';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

describe('Test in UpdatePreachingDto', () => {
    it('should convert data to UpdatePreachingDto', () => {
        const values: UpdatePreachingDtoValues = {
            day: new Date(),
            initHour: new Date(),
            finalHour: new Date(),
        }

        const dto = UpdatePreachingDto.create(values);

        expect(dto).toBeInstanceOf(UpdatePreachingDto);
        expect(dto).toEqual({
            day: Time.format(values.day, 'YYYY-MM-DD'),
            init_hour: Time.format(values.initHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            final_hour: Time.format(values.finalHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            updated_at: expect.any(String)
        });
    });
});