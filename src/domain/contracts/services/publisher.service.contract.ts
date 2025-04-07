import { ItemOption, ParticipateInMinistryItem } from '@infrastructure/interfaces';

export abstract class PublisherServiceContract {
    public abstract get MINISTRY_PARTICIPATIONS(): ParticipateInMinistryItem[];
    public abstract get PRECURSORS_OPTIONS(): ItemOption[];
}