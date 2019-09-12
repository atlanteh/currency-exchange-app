import config from 'config/config';

export function roundCurrency(value, step = config.roundStep) {
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

export function formatDateLexicographically(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}