export class Characters {

    /**
     * Capitalizes the first letter of a string.
     *
     * @param {string} str - The input string to capitalize.
     * @return {string} The capitalized string.
     */
    public static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * A function that truncates a string if it exceeds a specified limit.
     *
     * @param {string} str - The input string to truncate.
     * @param {number} limit - The character limit to truncate the string.
     * @return {string} The truncated string.
     */
    public static truncate(str: string, limit: number): string {
        if (str.length > limit) return `${ str.slice(0, limit) }...`;
        else return str;
    }
}