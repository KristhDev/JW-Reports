export interface RevisitEntity {
    id: string;
    userId: string;
    personName: string;
    about: string;
    address: string;
    photo?: string;
    nextVisit: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}