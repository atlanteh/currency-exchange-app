import React from 'react';
import 'currency-flags/dist/currency-flags.min.css';

export default function Flag({currency, className = ''}) {
    return (
        <span className={`currency-flag currency-flag-${currency.toLowerCase()} ${className}`} />
    );
}