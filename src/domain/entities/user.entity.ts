import { Precursor, UserEndpoint } from '@infrasturcture/interfaces';

export class UserEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly surname: string,
        public readonly email: string,
        public readonly precursor: Precursor,
        public readonly hoursRequirement: number,
        public readonly hoursLDC: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string
    ) {}

    public static fromEndpoint(user: UserEndpoint): UserEntity {
        return new UserEntity(
            user.id,
            user.name,
            user.surname,
            user.email,
            user.precursor,
            user.hours_requirement,
            user.hours_ldc,
            user.createdAt,
            user.updatedAt
        );
    }
}