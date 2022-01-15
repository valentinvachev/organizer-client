export const validateItemName = (name) => {
    if (!name.length) {
        throw {
            message: 'Item name can not be empty',
        };
    } else if (name.length < 2 || name.length > 250) {
        throw {
            message: 'Item name must be between 2 and 250 characters',
        };
    }
};
