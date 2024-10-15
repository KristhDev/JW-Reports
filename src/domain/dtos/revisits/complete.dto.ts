import { Time } from '@infrasturcture/adapters';

export class CompleteRevisitDto {

    private constructor(
        public readonly done: boolean,
        public readonly updated_at: string
    ) {}

    public static create(done: boolean): CompleteRevisitDto {
        return new CompleteRevisitDto(done, Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS'));
    }
}