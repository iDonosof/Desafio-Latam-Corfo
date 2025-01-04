export const get_current_date = (): string => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    return `${year}/${month}/${day}`;
};

export const get_current_time = (): string => {
    const date = new Date();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();

    return `${hours}:${minutes}:${seconds}`;
};