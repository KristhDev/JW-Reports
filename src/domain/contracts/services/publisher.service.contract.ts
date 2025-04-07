import { ItemOption } from '@infrastructure/interfaces';

export abstract class PublisherServiceContract {
    public abstract get PRECURSORS_OPTIONS(): ItemOption[];
}