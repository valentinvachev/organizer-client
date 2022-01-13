export const validateTaskName = (name) => {
    if (!name.length) {
        throw {
            message: 'Task name can not be empty',
        };
    } else if (name.length < 2 || name.length > 250) {
        throw {
            message: 'Task name should be between 2 and 250 symbols',
        };
    }
};
