export const getLocalDate = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
};

export const getMonthStart = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getMonthEnd = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const isSameMonth = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
};

export const getMonthKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};
