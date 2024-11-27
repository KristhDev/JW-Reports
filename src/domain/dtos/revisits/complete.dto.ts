/* Adapters */
import { Time } from '@infrasturcture/adapters';

export class CompleteRevisitDto {

    private constructor(
        public readonly done: boolean,
        public readonly updated_at: string
    ) {}

    /**
     * Creates a new CompleteRevisitDto with the given done status and the current time set as the updated_at date.
     * @param {boolean} done - The done status of the revisit.
     * @returns {CompleteRevisitDto} The new CompleteRevisitDto.
     */
    public static create(done: boolean): CompleteRevisitDto {
        return new CompleteRevisitDto(done, Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS'));
    }
}