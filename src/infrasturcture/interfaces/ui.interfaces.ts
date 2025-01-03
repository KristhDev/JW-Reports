/**
 * ItemOption is an object with a label property of type string and a value property of type string.
 *
 * @property {string} label - The text that will be displayed in the dropdown
 * @property {any} value - The value of the item.
 */
export type ItemOption = {
    label: string;
    value: any;
}

export interface DeleteOptions {
    onFinish?: () => void;
    onSuccess?: () => void;
}