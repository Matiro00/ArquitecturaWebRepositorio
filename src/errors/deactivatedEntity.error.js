module.exports = class DeactivatedUserError extends Error{
    constructor(message) {
        super(message)
        this.message = message;
    };
}
