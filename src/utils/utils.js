/**
 * Basic date formatter
 * @param {string} dateStr - date to format
 * @returns {string}
 */
export const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-US', options);
}

/**
 * Sort a array of values alphabetically
 * @param {string} first value to compare
 * @param {string} second value to compare
 * @returns {number}
 */
export const alphaSort = (a, b) => {
    return a.localeCompare(b);
}

/**
 * Sort a array of values numerically
 * @param {number} first value to compare
 * @param {number} second value to compare
 * @returns {number}
 */
export const numSort = (a, b) => {
    if (a < b) {
        return 1;
    } else if (a > b) {
        return -1;
    }
    return 0;
}

/**
 * Sort a array of date values
 * @param {string} first value to compare
 * @param {string} second value to compare
 * @returns {number}
 */
export const dateSort = (a, b) => {
    const first = new Date(a);
    const second = new Date(b);
    return numSort(first.getTime(), second.getTime());
}