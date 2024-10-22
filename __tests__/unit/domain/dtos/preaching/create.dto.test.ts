/* DTOs */
import { CreatePreachingDto, CreatePreachingDtoValues } from '@domain/dtos';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

describe('Test in CreatePreachingDto', () => {
    it('should convert data to CreatePreachingDto', () => {
        const values: CreatePreachingDtoValues = {
            userId: '9a7e28f4-a576-4763-8efe-cb3c5c982be7',
            day: new Date(),
            initHour: new Date(),
            finalHour: new Date(),
        }

        const dto = CreatePreachingDto.create(values);

        expect(dto).toBeInstanceOf(CreatePreachingDto);
        expect(dto).toEqual({
            user_id: values.userId,
            day: Time.format(values.day, 'YYYY-MM-DD'),
            init_hour: Time.format(values.initHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
            final_hour: Time.format(values.finalHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
        });
    });
});