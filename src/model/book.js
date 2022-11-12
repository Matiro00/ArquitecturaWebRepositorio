module.exports = class Book {
    constructor(id, name, author, price, isForSale, amount ){
        this.id = id;
        this.name = name;
        this.author = author;
        this.price = price;
        this.isForSale = isForSale;
        this.amount = amount;
    }
}