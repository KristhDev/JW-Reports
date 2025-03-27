import { CreatePreachingDto, UpdatePreachingDto } from '@domain/dtos';
import { PreachingEntity } from '@domain/entities';

export abstract class PreachingServiceContract {
    public abstract create(createPreachingDto: CreatePreachingDto): Promise<PreachingEntity>;
    public abstract delete(id: string, userId: string): Promise<void>;
    public abstract getByUserIdAndMonth(userId: string, month: Date): Promise<PreachingEntity[]>;
    public abstract getAllByUserId(userId: string): Promise<PreachingEntity[]>;
    public abstract update(id: string, userId: string, updatePreachingDto: UpdatePreachingDto): Promise<PreachingEntity>
}