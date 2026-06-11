export const formatCurrency = (amount) => `$${parseFloat(amount).toFixed(2)}`;

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('km-KH', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
};

export const formatMonthYear = (date) => {
    return date.toLocaleString('km-KH', { month: 'long', year: 'numeric' });
};

export const formatMonthYearShort = (date) => {
    return date.toLocaleString('km-KH', { month: 'short', year: '2-digit' });
};
