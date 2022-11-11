module.exports = class Book {
    constructor(idBook,idCheckout, amount ){
        this.idBook = idBook;
        this.idCheckout = idCheckout;
        this.amount = amount;
    }
}