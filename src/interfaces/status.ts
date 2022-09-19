export interface StatusState {
    code: number;
    msg: string;
}

export type SetStatusPayload = {
    code: number;
    msg: string;
}