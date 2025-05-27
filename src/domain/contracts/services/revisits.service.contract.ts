import { CompleteRevisitDto, CreateRevisitDto, UpdateRevisitDto } from '@domain/dtos';

import { RevisitEntity } from '@domain/entities';

import { PaginateOptions, RevisitFilterItem } from '@infrastructure/interfaces';
import { RevisitFilter } from '@revisits/interfaces';

export abstract class RevisitsServiceContract {
    public abstract get revisitsFiltersItems(): RevisitFilterItem[];
    public abstract complete(id: string, userId: string, completeRevisitDto: CompleteRevisitDto): Promise<RevisitEntity>;
    public abstract create(createRevisitDto: CreateRevisitDto): Promise<RevisitEntity>;
    public abstract delete(id: string, userId: string): Promise<void>;
    public abstract paginateByUserId(userId: string, options: PaginateOptions<RevisitFilter>): Promise<RevisitEntity[]>;
    public abstract getAllByUserId(userId: string): Promise<RevisitEntity[]>;
    public abstract getLastByUserId(userId: string): Promise<RevisitEntity>;
    public abstract update(id: string, userId: string, updateRevisitDto: UpdateRevisitDto): Promise<RevisitEntity>;
}