import { ERROR_MESSAGES } from './constants';

export const validateAmount = (amount) => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
        return ERROR_MESSAGES.invalidAmount;
    }
    return null;
};

export const validateDescription = (description) => {
    if (!description || !description.trim()) {
        return ERROR_MESSAGES.emptyDescription;
    }
    return null;
};

export const validateCategory = (category) => {
    if (!category || !category.trim()) {
        return ERROR_MESSAGES.emptyCategory;
    }
    return null;
};

export const validateTransaction = (amount, description, category) => {
    const amountError = validateAmount(amount);
    if (amountError) return amountError;

    const descError = validateDescription(description);
    if (descError) return descError;

    const catError = validateCategory(category);
    if (catError) return catError;

    return null;
};
