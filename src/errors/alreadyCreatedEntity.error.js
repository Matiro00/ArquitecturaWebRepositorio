module.exports = class AlreadyCreatedEntity extends Error{
    constructor(message) {
        super(message)
        this.message = message;
    };
}
