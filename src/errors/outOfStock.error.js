module.exports = class OutOfStockError extends Error{
    constructor(message) {
        super(message)
        this.message = message;
    };
}
