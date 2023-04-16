/* Defining the structure of the StatusState object. */
export interface StatusState {
    code: number;
    msg: string;
}

/**
 * SetStatusPayload is an object with a code property that is a number and a msg property that is a
 * string.
 * @property {number} code - The HTTP status code to set.
 * @property {string} msg - The message to display to the user.
 */
export type SetStatusPayload = {
    code: number;
    msg: string;
}