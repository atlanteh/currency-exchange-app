const manipulateCurrency = (value, step, mathMethod) => {
    var inv = 1.0 / step;
    return mathMethod(value * inv) / inv;
}
export const floorCurrency = (value, step) => manipulateCurrency(value, step, Math.floor);
export const roundCurrency = (value, step) => manipulateCurrency(value, step, Math.round);

export function formatDateLexicographically(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}