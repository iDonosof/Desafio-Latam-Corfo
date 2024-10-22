import { DAYS_IN_YEAR, DAYS_IN_WEEK } from '../Constants/date.js';

function GetFullDate(days) {
    let years = Math.floor(days / DAYS_IN_YEAR);
    let weeks = Math.floor((days % DAYS_IN_YEAR) / DAYS_IN_WEEK);
    let daysRemaining = Math.floor(((days % DAYS_IN_YEAR) % DAYS_IN_WEEK) % DAYS_IN_WEEK)

    return `${years} año, ${weeks} semana y ${daysRemaining} día.`;
}

export default GetFullDate;