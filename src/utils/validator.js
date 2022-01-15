export const validateItemName = (name) => {
    const nameTrimmed = name.trim();

    if (!nameTrimmed.length) {
        throw {
            message: 'Item name can not be empty',
        };
    } else if (nameTrimmed.length < 2 || nameTrimmed.length > 250) {
        throw {
            message: 'Item name must be between 2 and 250 characters',
        };
    }
};
